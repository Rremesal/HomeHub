import { Button } from "@heroui/button";
import {Popover as HeroPopover, PopoverTrigger, PopoverContent } from "@heroui/popover"
import Link from "next/link";
import LinkButton from "./linkbutton";

function Popover(props) {
  const { 
    placement,
     triggerComponent, 
     items, 
     open, 
     triggerType, 
     onOpenChange, 
     onClose,
    } = props;
  return (
    <HeroPopover 
      onOpenChange={onOpenChange}
      triggerType={triggerType} 
      isOpen={open} 
      onClose={onClose}
      placement={placement}
      
    >
      <PopoverTrigger>
        {triggerComponent}
      </PopoverTrigger>

      <PopoverContent className="p-3">
        <ul className=" list-none">
          {items.map((item, index) => (
            <li key={index}>
              {item.href ? (
                <LinkButton  href={item.href} fullWidth startContent={item.icon}>
                  {item.content}
                </LinkButton>
              ) : (
                <Button 
                  variant="light"
                  color={item.danger ? "danger" : "secondary"} 
                  fullWidth 
                  size="sm" 
                  startContent={item.icon} 
                  onPress={item.onClick}
                >
                  {item.content}
                </Button>
              )}
            </li>
          ))}
        </ul>
      </PopoverContent>
    </HeroPopover>
  )
}

export default Popover;