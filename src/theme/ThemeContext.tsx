import React, {createContext, useContext, useEffect, useMemo, useState} from 'react';
import {Appearance, ColorSchemeName, useColorScheme} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AppTheme, darkTheme, lightTheme, ThemeMode} from './theme';

const STORAGE_KEY = '@theme-mode'; // guarda 'auto' | 'light' | 'dark'

type ThemeContextValue = {
  mode: ThemeMode;               // seleccionado por el usuario
  setMode: (m: ThemeMode) => void;
  theme: AppTheme;               // tema resuelto (según mode + sistema)
  isDark: boolean;               // útil para condicionales
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

// Hook con validación
export const useTheme = (): ThemeContextValue => {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme debe usarse dentro de <ThemeProvider>');
  }
  return ctx;
};

type Props = { children: React.ReactNode };

export const ThemeProvider: React.FC<Props> = ({children}) => {
  const systemScheme = useColorScheme(); // 'light' | 'dark' | null
  const [mode, setMode] = useState<ThemeMode>('auto');

  // Cargar desde AsyncStorage al montar
  useEffect(() => {
    (async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved === 'light' || saved === 'dark' || saved === 'auto') {
          setMode(saved);
          console.log('[Theme] Cargado de storage =>', saved);
        } else {
          console.log('[Theme] No había valor guardado, usando auto');
        }
      } catch (e) {
        console.log('[Theme] Error al cargar tema', e);
      }
    })();
  }, []);

  // Guardar cuando el usuario cambia el modo
  useEffect(() => {
    (async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, mode);
        console.log('[Theme] Guardado en storage =>', mode);
      } catch (e) {
        console.log('[Theme] Error al guardar tema', e);
      }
    })();
  }, [mode]);

  // Si está en 'auto', seguir cambios del sistema (por si usas devices que cambian en caliente)
  useEffect(() => {
    const sub = Appearance.addChangeListener(({colorScheme}) => {
      if (mode === 'auto') {
        console.log('[Theme] Sistema cambió a', colorScheme);
      }
    });
    return () => sub.remove();
  }, [mode]);

  // Resolver el tema final
  const isDark = useMemo<boolean>(() => {
    if (mode === 'dark') return true;
    if (mode === 'light') return false;
    return (systemScheme as ColorSchemeName) === 'dark';
  }, [mode, systemScheme]);

  const theme = isDark ? darkTheme : lightTheme;

  const value = useMemo<ThemeContextValue>(() => ({
    mode, setMode, theme, isDark,
  }), [mode, theme, isDark]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
