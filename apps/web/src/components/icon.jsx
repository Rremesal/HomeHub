// Icons
import { SunIcon, MoonIcon, EllipsisHorizontalIcon, MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/24/outline"


function Icon(props) {
  const { name, size, className, ...rest } = props;

  const supported_icons = {
    sun: SunIcon,
    moon: MoonIcon,
    elipsisHorizontal: EllipsisHorizontalIcon,
    magnifyingGlass: MagnifyingGlassIcon,
    plus: PlusIcon,
  }

  const DynamicIcon = supported_icons[name];

  if (!DynamicIcon) return null

  return (
    <DynamicIcon className={`${size ? `size-${size}` : "size-5"} ${className}`} {...rest} />
  )
}

export default Icon;
