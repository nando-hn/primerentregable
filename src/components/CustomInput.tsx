// src/components/CustomInput.tsx
import React, { useMemo, useState } from 'react';
import { TextInput, View, Text, StyleSheet, TextInputProps } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

type Props = TextInputProps & {
  label?: string;
  error?: string;
};

export default function CustomInput({
  label,
  error,
  style,
  onFocus,
  onBlur,
  ...rest
}: Props) {
  const { theme } = useTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);
  const [focused, setFocused] = useState(false);

  return (
    <View style={styles.container}>
      {!!label && <Text style={styles.label}>{label}</Text>}

      <TextInput
        {...rest}
        onFocus={(e) => {
          setFocused(true);
          onFocus?.(e);
        }}
        onBlur={(e) => {
          setFocused(false);
          onBlur?.(e);
        }}
        placeholderTextColor={theme.colors.mutedText}
        style={[
          styles.input,
          focused && styles.inputFocused,
          !!error && styles.inputError,
          style,
        ]}
      />

      {!!error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const makeStyles = (theme: import('../theme/theme').AppTheme) =>
  StyleSheet.create({
    container: { width: '100%', marginBottom: 14 },
    label: { fontSize: 14, marginBottom: 6, color: theme.colors.mutedText },
    input: {
      height: 48,
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: 10,
      paddingHorizontal: 12,
      backgroundColor: theme.colors.inputBg,
      color: theme.colors.text,
    },
    inputFocused: {
      borderColor: theme.colors.primary,
      shadowColor: '#000',
      shadowOpacity: 0.08,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 4,
      elevation: 2,
    },
    inputError: {
      borderColor: theme.colors.danger,
      // tono suave para error en ambos temas
      backgroundColor: theme.colors.inputBg,
    },
    errorText: { color: theme.colors.danger, marginTop: 4, fontSize: 12 },
  });
