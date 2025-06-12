import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "../input";
import { loginValidation } from "@/validation";
import { Button } from "@heroui/button";
import useAuth from "../hooks/auth.hook";
import { Alert } from "@heroui/alert";

function LoginForm() {
  const { login } = useAuth();
  const { control, handleSubmit, setError, formState: { errors, isLoading } } = useForm({
    resolver: yupResolver(loginValidation),
    mode: "onChange"
  });

  const handleFormSubmit = async values => {
    try {
      await login(values)
    } catch (error) {
      setError("submit", {message: error});
    }
  }
  
  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col gap-3">
      <Input 
        control={control}
        name="email" 
        label="Email" 
      />
      <Input 
        control={control}
        name="password" 
        label="Password" 
        type="password" 
      />

      <Button 
        color="secondary" 
        radius="sm"
        isLoading={isLoading}
        type="submit"
      >
        Login
      </Button>

      {errors["submit"] && <Alert color="danger" description={errors["submit"].message} />}
    </form>
  )
}

export default LoginForm;