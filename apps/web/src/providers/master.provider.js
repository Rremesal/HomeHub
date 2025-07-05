import { HeroUIProvider } from "@heroui/system";
import AuthProvider from "./auth.provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ThemeProvider from "./theme.provider";

function MasterProvider(props) {
  const { children } = props;

  const queryClient = new QueryClient();

  return (
      <QueryClientProvider client={queryClient}>
          <ThemeProvider>
            <HeroUIProvider>
                <AuthProvider>
                  {children}
                </AuthProvider>
            </HeroUIProvider>
          </ThemeProvider>
      </QueryClientProvider>
  )
}

export default MasterProvider;