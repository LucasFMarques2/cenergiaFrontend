import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./styles/themes/defaultTheme";
import { GlobalStyle } from "./styles/globa";
import { AppRoutes } from "./routes";
import { AuthProvider } from "./hooks/auth"; // Certifique-se de importar o AuthProvider

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
      <GlobalStyle />
    </ThemeProvider>
  );
}
