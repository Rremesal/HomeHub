import { useController } from "react-hook-form";

// Core
import { Input as HeroInput} from "@heroui/input"

function Input(props) {
  const { name, label, type ="text", control } = props;

  const { field, fieldState: { error } } = useController({ name, control });

  return (
    <HeroInput
      name={field.name}
      ref={field.ref}
      onChange={field.onChange}
      value={field.value || ""}
      label={label}
      type={type}

      errorMessage={error && error.message}
      isInvalid={!!error}
    />
  );
}

export default Input;