import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../AppNavigator';
import colors from '../theme/colors';
import CustomButton from '../components/CustomButton'; 

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ route, navigation }: Props) { 
  const { name } = route.params;
  const isShortName = name.trim().length <= 4;

  const logout = () => {
    // Limpia el historial y vuelve a Login
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  return (
    <View style={[styles.container, isShortName ? styles.variantA : styles.variantB]}>
      <View style={styles.card}>
        <Text style={styles.title}>¡Hola, {name}!</Text>
        <Text style={styles.text}>
          Esta pantalla demuestra un estilo condicional basado en el nombre.
        </Text>
        <Text style={styles.text}>
          Si el nombre es corto, se mostrará un fondo claro; si es más largo, un fondo ligeramente diferente.
        </Text>

        {/* Botón Cerrar sesión */}
        <View style={{ marginTop: 16 }}>
          <CustomButton title="Cerrar sesión" onPress={logout} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  variantA: { backgroundColor: '#eef6ff' },
  variantB: { backgroundColor: '#f4f6f8' },
  card: {
    width: '88%',
    backgroundColor: colors.card,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 1,
  },
  title: { fontSize: 22, fontWeight: '700', color: colors.text, marginBottom: 8 },
  text: { color: colors.muted, marginTop: 6 },
});
