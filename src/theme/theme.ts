// Tipos y paleta base
export type ThemeMode = 'auto' | 'light' | 'dark';

export type AppTheme = {
  colors: {
    background: string;
    card: string;
    text: string;
    mutedText: string;
    primary: string;
    border: string;
    inputBg: string;
    danger: string;
  };
};

export const lightTheme: AppTheme = {
  colors: {
    background: '#FFFFFF',
    card: '#F6F6F6',
    text: '#0F0F0F',
    mutedText: '#666',
    primary: '#2563EB',
    border: '#E5E7EB',
    inputBg: '#FFFFFF',
    danger: '#DC2626',
  },
};

export const darkTheme: AppTheme = {
  colors: {
    background: '#0B0B0E',
    card: '#15161A',
    text: '#F5F5F5',
    mutedText: '#A1A1AA',
    primary: '#60A5FA',
    border: '#26272B',
    inputBg: '#111215',
    danger: '#F87171',
  },
};
