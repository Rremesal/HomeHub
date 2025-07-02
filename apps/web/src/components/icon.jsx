// Icons
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline"


function Icon(props) {
  const { name, ...rest } = props;

  const supported_icons = {
    sun: SunIcon,
    moon: MoonIcon,
  }

  const DynamicIcon = supported_icons[name];

  if (!DynamicIcon) return null

  return (
    <DynamicIcon {...rest} />
  )
}

export default Icon;
