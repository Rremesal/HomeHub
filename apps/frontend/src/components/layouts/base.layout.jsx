import { PUBLIC_ROUTES } from "@/constants";
import NavBar from "../navbar";
import { useRouter } from "next/router";

function BaseLayout(props) {
  const { children } = props;
  const router = useRouter();



  return (
   <div className="w-screen">
      <div>
        {!PUBLIC_ROUTES.includes(router.asPath) && <NavBar />}
      </div>

      <main>
        {children}
      </main>
   </div>
  )
}

export default BaseLayout;