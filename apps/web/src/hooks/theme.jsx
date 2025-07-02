import { useContext } from "react";

import { ThemeContext } from "@/providers/theme.provider";

const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) return null;
  return context;
}

export default useTheme;