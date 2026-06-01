import { StrictMode, useState, useRef } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { UserProvider, USERS } from "./context/UserContext";
import App from "./App";
import "./app.css";

/**
 * AppRoot owns the bridge between UserProvider and ThemeProvider.
 *
 * When the user switches accounts, UserProvider calls onUserChange(themePreference).
 * AppRoot lifts that value into state, which re-seeds ThemeProvider so the
 * app theme snaps to the selected user's preference automatically.
 *
 * When the theme toggle is clicked, ThemeProvider calls onThemeChange(newTheme).
 * AppRoot forwards that to UserProvider via a ref so the active user's
 * themePreference is updated to match what they manually selected.
 *
 * Neither provider needs to know about the other — the coordination
 * lives here at the composition root.
 */
function AppRoot() {
  // Start with Alex's preference (dark) as the initial theme
  const [activeTheme, setActiveTheme] = useState<string>(
    USERS[0].themePreference
  );

  // Ref to UserProvider's updateUserTheme — populated once the tree mounts.
  // Using a ref avoids a circular dependency between the two providers.
  const updateUserThemeRef = useRef<((theme: string) => void) | null>(null);

  // Called by ThemeProvider whenever the theme toggle fires.
  // Forwards the new theme to UserProvider so the active user's preference is saved.
  function handleThemeChange(newTheme: string) {
    updateUserThemeRef.current?.(newTheme);
  }

  return (
    <ThemeProvider initialTheme={activeTheme} onThemeChange={handleThemeChange}>
      {/* onUserChange fires when selectUser() is called anywhere in the tree */}
      <UserProvider
        onUserChange={setActiveTheme}
        registerUpdateTheme={(fn) => { updateUserThemeRef.current = fn; }}
      >
        <App />
      </UserProvider>
    </ThemeProvider>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AppRoot />
    </BrowserRouter>
  </StrictMode>
);
