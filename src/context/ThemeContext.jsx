import { createContext, useContext, useState, useEffect } from "react";

// ─── 1. Create the Context ────────────────────────────────────────────────────
// Default value shape matches what the Provider will supply.
export const ThemeContext = createContext({
  theme: "light",        // current theme string: "light" | "dark"
  toggleTheme: () => {}, // flip between themes
  setTheme: () => {},    // set theme directly (used when switching users)
});

// ─── 2. Custom Provider Component ────────────────────────────────────────────
// Owns the theme state and exposes it + the toggle to the whole tree.
// Accepts an optional `initialTheme` prop so the user switcher can seed
// the correct theme when the app first loads.
export function ThemeProvider({ children, initialTheme, onThemeChange }) {
  // Initialise from prop → localStorage → default "light"
  const [theme, setThemeState] = useState(() => {
    return initialTheme ?? localStorage.getItem("theme") ?? "light";
  });

  // When the parent re-renders with a new initialTheme (user switched),
  // sync the internal state to match the new user's preference.
  useEffect(() => {
    if (initialTheme) setThemeState(initialTheme);
  }, [initialTheme]);

  // Whenever theme changes, persist it and update the <html> data attribute.
  // The data-theme attribute is what our CSS variables key off of.
  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Toggle logic lives here — components never need to know the details.
  // Also notifies AppRoot so the active user's preference can be updated.
  function toggleTheme() {
    setThemeState((prev) => {
      const next = prev === "light" ? "dark" : "light";
      onThemeChange?.(next);
      return next;
    });
  }

  // Direct setter — called by UserProvider when a new user is selected
  function setTheme(value) {
    setThemeState(value);
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// ─── 3. Convenience hook ─────────────────────────────────────────────────────
// Any component can call useTheme() instead of importing both useContext
// and ThemeContext separately.
export function useTheme() {
  return useContext(ThemeContext);
}
