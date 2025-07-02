import { Fragment, useEffect } from "react";
import { useRouter } from "next/router";

// Core
import Navbar from "../navbar";

// Utils
import PUBLIC_ROUTES from "@/constants/route.const";

function BaseLayout(props) {
  const { children } = props;
  const router = useRouter();

  console.log(router.asPath.includes(PUBLIC_ROUTES.login))

  return (
    <Fragment>
      { !router.asPath.includes(PUBLIC_ROUTES.login) && <Navbar />}

      <main className="flex flex-col bg-background h-screen">
        {children}
      </main>
    </Fragment>
  )
}

export default BaseLayout;