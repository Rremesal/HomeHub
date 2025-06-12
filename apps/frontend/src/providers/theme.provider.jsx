import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

function ThemeProvider(props) {
  const { children } = props;
  const [theme, setTheme] = useState("light");


  useEffect(() => {
    const localTheme = localStorage.getItem("appTheme");
    if (localTheme) {
      setTheme(localTheme);
    }
  }, [])

  useEffect(() => {
    // update the localStorage
    localStorage.setItem("appTheme", theme);

    // apply the changed theme
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark")
    }
  }, [theme]);

  const changeTheme = () => {
    if (theme === "dark") {
      setTheme("light")
    } else {
      setTheme("dark")
    }
  }

  const state = {
    theme,
    changeTheme,
  }

  return (
    <ThemeContext.Provider value={state}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider;