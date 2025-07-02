import { HeroUIProvider } from "@heroui/system";
import AuthProvider from "./auth.provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function MasterProvider(props) {
  const { children } = props;

  const queryClient = new QueryClient();

  return (
      <QueryClientProvider client={queryClient}>
        <HeroUIProvider>
            <AuthProvider>
              {children}
            </AuthProvider>
        </HeroUIProvider>
      </QueryClientProvider>
  )
}

export default MasterProvider;