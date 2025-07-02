import useAuth from "@/hooks/auth";

function HomePage() {
  const { currentUser } = useAuth();
  return (
    <div>
      <pre>{JSON.stringify(currentUser, null, 2)}</pre>
    </div>
  )
}

export default HomePage;