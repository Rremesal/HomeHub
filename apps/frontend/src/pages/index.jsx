import useAuth from "@/components/hooks/auth.hook";
import { Fragment } from "react";

function HomePage() {
  const { currentUser } = useAuth();
  return (
    <Fragment>
      <div>Home</div>
    </Fragment>
  )
}

export default HomePage;