// src/components/CustomButton.tsx
import React, { useMemo } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

type Props = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
};

export default function CustomButton({ title, onPress, disabled, variant = 'primary' }: Props) {
  const { theme } = useTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);

  const bg =
    variant === 'primary'
      ? disabled
        ? theme.colors.border
        : theme.colors.primary
      : theme.colors.card;

  const textColor = variant === 'primary' ? '#fff' : theme.colors.text;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.btn, { backgroundColor: bg }]}
      activeOpacity={0.8}
      disabled={disabled}
    >
      <Text style={[styles.btnText, { color: textColor }]}>{title}</Text>
    </TouchableOpacity>
  );
}

const makeStyles = (theme: import('../theme/theme').AppTheme) =>
  StyleSheet.create({
    btn: {
      height: 48,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    btnText: {
      fontWeight: '600',
      fontSize: 16,
    },
  });
