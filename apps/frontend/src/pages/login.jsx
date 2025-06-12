import LoginForm from "@/components/forms/login.form";

function LoginPage() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className=" w-[340px] bg-primary-500 px-6 py-3 rounded-small shadow-xl m-2">
        <h1 className="mb-3">Login</h1>
        <LoginForm/>
      </div>
    </div>

  )
}

export default LoginPage;