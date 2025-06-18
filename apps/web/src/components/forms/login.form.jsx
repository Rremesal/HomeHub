import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// Core
import { loginValidation } from "./_validations";
import Input from "../input";
import { Button } from "@heroui/button";

function LoginForm() {
  const { control, handleSubmit, formState: { errors }} = useForm({
    resolver: yupResolver(loginValidation),
    mode: "onChange"
  });

  const handleFormSubmit = async values => {
    console.log(values);
  }


  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit(handleFormSubmit)}>
      <Input 
        name="email"
        label="Email"
        control={control}
      />

      <Input 
        name="password"
        label="Password"
        type="password"
        control={control}
      />

      <div className="text-end">
        <Button color="primary" type="submit">
          Login
        </Button>
      </div>
    </form>
  )
}

export default LoginForm;