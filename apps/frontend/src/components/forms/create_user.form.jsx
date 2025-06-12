import { yupResolver } from "@hookform/resolvers/yup";
import { createUserValidation } from "@/validation";
import { useMutation } from "@tanstack/react-query";
import { createUser } from "@/mutations/user";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { Button } from "@heroui/button";
import { Alert } from "@heroui/alert";
import { useEffect } from "react";
import Input from "../input";

function CreateUserForm() {
  const router = useRouter();
  const { control, handleSubmit, setError, formState: { errors } } = useForm({
    resolver: yupResolver(createUserValidation),
    mode: "onChange"
  });

  const { mutateAsync, isSuccess } = useMutation({
    mutationKey: ["create_user"],
    mutationFn: createUser
  });

  useEffect(() => {
    if (isSuccess) router.push("/users");
  }, [isSuccess])

  const handleFormSubmit = async values => {
    try {
      await mutateAsync(values);
    } catch (error) {
      setError("submit", { message: error.message });
    }
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col gap-3">
      <Input name="firstName" label="First name" control={control} />
      <Input name="lastName" label="Last name" control={control} />
      <Input name="email" label="Email" control={control} />

      <div className="text-end">
        <Button color="primary" type="submit" size="sm">
          Create
        </Button>
      </div>

      {errors["submit"] && <Alert color="danger" description={errors["submit"].message} />}
    </form>
  )
}

export default CreateUserForm;