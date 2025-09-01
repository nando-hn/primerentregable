import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

type Props = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
};

export default function CustomButton({ title, onPress, disabled }: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.btn, disabled && styles.btnDisabled]}
      activeOpacity={0.8}
      disabled={disabled}
    >
      <Text style={styles.btnText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    height: 48,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0077ff',
  },
  btnDisabled: {
    backgroundColor: '#9ec9ff',
  },
  btnText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
