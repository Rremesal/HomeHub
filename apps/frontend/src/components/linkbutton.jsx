import { Button } from "@heroui/button";
import Link from "next/link";

function LinkButton(props) {
  const { children, href, color, ...rest } = props;

  return (
    <Button 
    {...rest} 
      size="sm" 
      color="secondary"
      variant="light"  
      href={href} 
      as={Link}
    >
      {children}
    </Button>
  )
}

export default LinkButton;