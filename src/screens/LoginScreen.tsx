// src/screens/LoginScreen.tsx
import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import { isEmail, isRequired, isPhone } from '../utils/validation';
import type { RootStackParamList } from '../AppNavigator';
import { useTheme } from '../theme/ThemeContext'; // 👈 usar contexto

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
  const { theme } = useTheme(); // 👈 colores del tema activo

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');

  const [errors, setErrors] = useState<{ [k: string]: string | undefined }>({});

  const onSubmit = () => {
    const newErrors: { [k: string]: string | undefined } = {};
    if (!isEmail(email)) newErrors.email = 'Ingrese un correo válido';
    if (!isRequired(password)) newErrors.password = 'La contraseña es obligatoria';
    if (!isPhone(phone)) newErrors.phone = 'Ingrese un teléfono válido (8-15 dígitos)';
    if (!isRequired(name)) newErrors.name = 'El nombre es obligatorio';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      navigation.replace('Home', { name });
    }
  };

  // ✅ estilos dependientes del tema
  const styles = useMemo(() => makeStyles(theme), [theme]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.select({ ios: 'padding', android: undefined })}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={require('../assets/logo.png')} style={styles.logo} resizeMode="contain" />
        <Text style={styles.title}>Bienvenido 👋</Text>
        <Text style={styles.subtitle}>Inicia sesión para continuar</Text>

        <View style={styles.form}>
          <CustomInput
            label="Correo electrónico"
            value={email}
            onChangeText={setEmail}
            placeholder="usuario@correo.com"
            keyboardType="email-address"
            error={errors.email}
          />
          <CustomInput
            label="Contraseña"
            value={password}
            onChangeText={setPassword}
            placeholder="••••••••"
            secureTextEntry
            error={errors.password}
          />
          <CustomInput
            label="Teléfono"
            value={phone}
            onChangeText={setPhone}
            placeholder="9999-9999"
            keyboardType="phone-pad"
            error={errors.phone}
          />
          <CustomInput
            label="Nombre"
            value={name}
            onChangeText={setName}
            placeholder="Tu nombre"
            error={errors.name}
          />

          <CustomButton title="Entrar" onPress={onSubmit} />
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Detalles técnicos del entregable</Text>
          <Text style={styles.infoText}>• Validación de correo, contraseña, teléfono y campo de texto.</Text>
          <Text style={styles.infoText}>• Estilo condicional: inputs cambian de borde si hay error o foco.</Text>
          <Text style={styles.infoText}>• Imagen local mostrada arriba (logo.png).</Text>
          <Text style={styles.infoText}>• Navegación: Login → Home (stack).</Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// 🔧 generador de estilos dependiente de theme
const makeStyles = (theme: import('../theme/theme').AppTheme) =>
  StyleSheet.create({
    container: {
      padding: 20,
      paddingTop: 40,
      backgroundColor: theme.colors.background,
      flexGrow: 1,
      alignItems: 'center',
    },
    logo: { width: 140, height: 140, marginBottom: 8 },
    title: { fontSize: 22, fontWeight: '700', color: theme.colors.text, marginTop: 4 },
    subtitle: { fontSize: 14, color: theme.colors.mutedText, marginBottom: 16 },
    form: {
      width: '100%',
      backgroundColor: theme.colors.card,
      padding: 16,
      borderRadius: 16,
      shadowColor: '#000',
      shadowOpacity: 0.06,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 8,
      elevation: 1,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    infoCard: {
      marginTop: 16,
      width: '100%',
      backgroundColor: theme.colors.card,
      padding: 16,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    infoTitle: { fontWeight: '700', marginBottom: 6, color: theme.colors.text },
    infoText: { color: theme.colors.mutedText, marginVertical: 2 },
  });
