// Core
import { Popover as HeroPopover, PopoverContent, PopoverTrigger } from "@heroui/popover";

function Popover(props) {
  const { open, onClose, children, trigger, placement } = props;

  return (
  <HeroPopover placement={placement}  onClose={onClose} isOpen={open}>
    <PopoverTrigger>
      {trigger}
    </PopoverTrigger>
    <PopoverContent className="p-3 text-foreground">
      {children}
    </PopoverContent>
  </HeroPopover>
  );
}

export default Popover;