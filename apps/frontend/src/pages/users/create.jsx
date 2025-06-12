import CreateUserForm from "@/components/forms/create_user.form";
import DefaultLayout from "@/components/layouts/default.layout";

function CreateUserPage() {

  return (
    <DefaultLayout>
      <div className="h-full flex justify-center items-center">
        <div className="w-[340px] bg-primary-500 p-3 rounded-md">
          <CreateUserForm />
        </div>
      </div>
    </DefaultLayout>
  )
}

export default CreateUserPage;