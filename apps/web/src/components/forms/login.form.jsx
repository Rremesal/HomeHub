import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

// Core
import { loginValidation } from "./_validations";
import { Button } from "@heroui/button";
import { Alert } from "@heroui/alert";
import Input from "../input";

// Hooks
import useAuth from "@/hooks/auth";


function LoginForm() {
  const { control, handleSubmit, setError, formState: { errors }} = useForm({
    resolver: yupResolver(loginValidation),
    mode: "onChange"
  });

  const { login } = useAuth();
  const router = useRouter();

  const handleFormSubmit = async values => {
    try {
      await login(values);
      router.replace("/");
    } catch (error) {
      setError("submit", {message: error.message});
    }
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
        <Button radius="md" color="primary" type="submit">
          Login
        </Button>
      </div>

      { errors.submit && <Alert color="danger" title={errors.submit.message} /> }
    </form>
  )
}

export default LoginForm;