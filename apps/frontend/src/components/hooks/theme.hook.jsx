import { ThemeContext } from "@/providers/theme.provider";
import { useContext } from "react";

function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) return null;
  return context;
}

export default useTheme;