import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import AuthProvider from "./auth.provider";
import { HeroUIProvider } from "@heroui/system";
import ThemeProvider from "./theme.provider";

function MasterProvider(props) {
  const { children } = props;

  const queryClient = new QueryClient();

  return (
    <HeroUIProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </AuthProvider>
      </QueryClientProvider>
    </HeroUIProvider>
  )
}

export default MasterProvider;