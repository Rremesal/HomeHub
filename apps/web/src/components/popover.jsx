// Core
import { Popover as HeroPopover, PopoverContent, PopoverTrigger } from "@heroui/popover";

function Popover(props) {
  const { open, onClose, children, trigger } = props;

  return (
  <HeroPopover onClose={onClose} isOpen={open}>
    <PopoverTrigger>
      {trigger}
    </PopoverTrigger>
    <PopoverContent className="p-3">
      {children}
    </PopoverContent>
  </HeroPopover>
  );
}

export default Popover;