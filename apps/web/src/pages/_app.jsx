import BaseLayout from "@/components/layouts/base.layout";
import MasterProvider from "@/providers/master.provider";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <MasterProvider>
      <BaseLayout>
        <Component {...pageProps} />
      </BaseLayout>
    </MasterProvider>
  )
}
