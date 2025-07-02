import DefaultLayout from "@/components/layouts/default.layout";
import useAuth from "@/hooks/auth";

function HomePage() {
  const { currentUser } = useAuth();
  return (
    <DefaultLayout>
      
    </DefaultLayout>
  )
}

export default HomePage;