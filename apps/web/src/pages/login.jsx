
// Core
import LoginForm from "@/components/forms/login.form";
import { Card, CardBody, CardHeader } from "@heroui/card";

function LoginPage() {
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-background">
      <Card className="w-[340px]">
        <CardHeader className="font-bold text-xl">
          Login
        </CardHeader>

        <CardBody>
          <LoginForm />
        </CardBody>
      </Card>

    </div>

  )
}

export default LoginPage;