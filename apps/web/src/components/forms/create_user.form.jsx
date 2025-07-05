import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { createUserValidation } from "./_validations";
import Input from "../input";
import { useMutation } from "@tanstack/react-query";
import { createUser } from "@/mutations/user";
import { Button } from "@heroui/button";
import useQueryHelper from "@/hooks/query_helper";
import { useRouter } from "next/router";


function CreateUserForm(props) {
  const { onSubmit } = props;

  const { handleSubmit, control, setError} = useForm({
    resolver: yupResolver(createUserValidation),
    mode: "onChange"
  });

  const { mutateAsync } = useMutation({
    mutationKey: ["create_user"],
    mutationFn: createUser,
  });

  const router = useRouter();
  const { invalidateQuery } = useQueryHelper();

  const handleFormSubmit = async values => {
    try {
      await mutateAsync(values);
      invalidateQuery(["users", router.query]);
      onSubmit();
    } catch (error) {
      setError("submit", { message: error.message })
    }
  }

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit(handleFormSubmit)}>
      <Input 
        name="first_name"
        label="First name"
        control={control}
      />

       <Input 
        name="last_name"
        label="Last name"
        control={control}
      />

       <Input 
        name="email"
        label="Email"
        control={control}
      />

      <div className="text-end">
        <Button radius="md" color="primary" type="submit">
          Login
        </Button>
      </div>

    </form>
  )
}

export default CreateUserForm;
