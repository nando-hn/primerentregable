// App.tsx
import React from 'react';
import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AppNavigator from './src/AppNavigator';

import { ThemeProvider, useTheme } from './src/theme/ThemeContext';

// Si usas React Navigation, opcionalmente puedes pasarle el tema nativo.
// Descomenta si quieres que NavigationContainer también tome tus colores.
// import { NavigationContainer, Theme as NavTheme } from '@react-navigation/native';

const Root = () => {
  const { isDark } = useTheme();
  return (
    <>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      <AppNavigator />
      {/* 
      // EJEMPLO si tu AppNavigator NO envuelve NavigationContainer:
      // const navTheme: NavTheme = {
      //   dark: isDark,
      //   colors: {
      //     primary: theme.colors.primary,
      //     background: theme.colors.background,
      //     card: theme.colors.card,
      //     text: theme.colors.text,
      //     border: theme.colors.border,
      //     notification: theme.colors.primary,
      //   },
      // };
      // return (
      //   <>
      //     <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      //     <NavigationContainer theme={navTheme}>
      //       <AppNavigator />
      //     </NavigationContainer>
      //   </>
      // );
      */}
    </>
  );
};

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        <Root />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
