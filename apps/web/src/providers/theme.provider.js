import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

function ThemeProvider(props) {
  const { children } = props;

  const [theme, setTheme] = useState(null);

  useEffect(() => {
    const currentTheme = localStorage.getItem("appTheme");
    if (!currentTheme) {
      localStorage.setItem("appTheme", "light");
      setTheme("light");
    }

    setTheme(currentTheme);
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.body.classList.add("dark");
    } else if (theme === "light") {
      document.body.classList.remove("dark");
    }
  }, [theme])


  /**
   * @description Changes the theme that is applied to the app
   * @param {string} theme The theme you want to change to
   */
  const changeTheme = (theme) => {
    if (theme === "light") {
      setTheme("light");
      localStorage.setItem("appTheme", "light");
    } else if (theme === "dark") {
      setTheme("dark");
      localStorage.setItem("appTheme", "dark");
    }
  }

  const state = {
    theme,
    changeTheme
  }

  return (
    <ThemeContext.Provider value={state}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider;
