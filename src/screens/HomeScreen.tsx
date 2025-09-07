// src/screens/HomeScreen.tsx
import React, { useMemo } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../AppNavigator';
import { useTheme } from '../theme/ThemeContext';
import CustomButton from '../components/CustomButton';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ route, navigation }: Props) {
  const { name } = route.params;
  const { theme, isDark, mode, setMode } = useTheme();

  const isShortName = name.trim().length <= 4;

  const logout = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  const styles = useMemo(() => makeStyles(theme), [theme]);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isShortName ? theme.colors.background : theme.colors.card },
      ]}
    >
      <View style={styles.card}>
        <Text style={styles.title}>¡Hola, {name}!</Text>
        <Text style={styles.text}>
          Esta pantalla demuestra un estilo condicional basado en el nombre.
        </Text>
        <Text style={styles.text}>
          Si el nombre es corto, se mostrará un fondo (tema + variante); si es más largo, otro.
        </Text>

        {/* Switch para el tema */}
        <View style={styles.switchRow}>
          <ModeButton label="Auto" active={mode === 'auto'} onPress={() => setMode('auto')} />
          <ModeButton label="Claro" active={mode === 'light'} onPress={() => setMode('light')} />
          <ModeButton label="Oscuro" active={mode === 'dark'} onPress={() => setMode('dark')} />
        </View>

        {/* Botón Cerrar sesión */}
        <View style={{ marginTop: 16 }}>
          <CustomButton title="Cerrar sesión" onPress={logout} />
        </View>
      </View>
    </View>
  );
}

const ModeButton = ({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) => (
  <Pressable
    onPress={onPress}
    style={{
      borderWidth: 1,
      borderRadius: 8,
      paddingVertical: 6,
      paddingHorizontal: 12,
      marginHorizontal: 4,
      borderColor: active ? '#22c55e' : '#999',
      backgroundColor: active ? '#22c55e22' : 'transparent',
    }}
  >
    <Text style={{ color: active ? '#22c55e' : '#666', fontWeight: '600' }}>{label}</Text>
  </Pressable>
);

const makeStyles = (theme: import('../theme/theme').AppTheme) =>
  StyleSheet.create({
    container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
    card: {
      width: '88%',
      backgroundColor: theme.colors.card,
      padding: 20,
      borderRadius: 16,
      shadowColor: '#000',
      shadowOpacity: 0.06,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 8,
      elevation: 1,
    },
    title: { fontSize: 22, fontWeight: '700', color: theme.colors.text, marginBottom: 8 },
    text: { color: theme.colors.mutedText, marginTop: 6 },
    switchRow: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 16,
    },
  });
