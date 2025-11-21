import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import { setFromStorage } from "@/features/auth/authSlice";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <Startup />
      <App />
    </ThemeProvider>
  </Provider>
);

function Startup() {
  // Initialize auth state from localStorage before app routes render
  store.dispatch(setFromStorage());
  const state = store.getState();
  if (!state.auth.accessToken && state.auth.refreshToken) {
    // Attempt to refresh tokens silently
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    (async () => {
      const { refreshThunk } = await import('@/features/auth/authSlice');
      store.dispatch(refreshThunk());
    })();
  }
  return null;
}
