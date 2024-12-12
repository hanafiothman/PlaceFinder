import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Theme {
  colors: {
    primary: string;
    background: string;
    gray: string;
    grayBackground: string;
    grayInactive: string;
  }
}

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const themes: Record<string, Theme> = {
  light: {
    colors: {
      primary: '#FFCF00',
      background: '#FFFFFF',
      gray: '#7D7C8E',
      grayBackground: '#F4F7FC',
      grayInactive: '#E5E5E5',
    },
  },
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(themes.light);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
