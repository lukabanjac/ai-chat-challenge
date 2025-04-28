import React from 'react';
import { createContext, useContext, useState } from 'react';

const ThemeContext: { switchTheme?: void } = createContext({});

export function ThemeProvider({ children }) {
  const [themeMode, setThemeMode] = useState('light');

  const switchTheme = (theme) => {
    setThemeMode(theme);
    document.documentElement.className = theme;
  };

  return (
    <ThemeContext.Provider value={{ themeMode, switchTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
