// Core
import { ButtonGroup, Button } from "@heroui/button";
import Icon from "./icon";

// Hooks
import useTheme from "@/hooks/theme";

function ThemeSwitch() {
  const { changeTheme, theme } = useTheme();

  return (
    <ButtonGroup fullWidth size="sm">
      <Button
        variant="ghost"
        onPress={() => changeTheme("light")}
        startContent={<Icon name="sun"/>}
        className={`${theme === "light" && "bg-selected"}`}
      >
        Light
      </Button>

      <Button
        variant="ghost"
        onPress={() => changeTheme("dark")}
        startContent={<Icon name="moon" />}
        className={`${theme === "dark" && "bg-selected"}`}
      >
        Dark
      </Button>
    </ButtonGroup>
  )
}

export default ThemeSwitch;
