import { Input as HeroInput } from "@heroui/input";
import { useController } from "react-hook-form";

function Input(props) {
  const { name, control, placeholder, label, type = "text" } = props;
  const { field, fieldState: { error } } = useController({ name, control});

  return (
    <div>
      <HeroInput
        size="sm"
        label={label}
        type={type}
        name={field.name}
        onChange={field.onChange}
        value={field.value || ""}
        ref={field.ref}
        disabled={field.disabled}
        placeholder={placeholder}
        errorMessage={error && error.message}
        isInvalid={!!error}
      />
    </div>
  )
}

export default Input;