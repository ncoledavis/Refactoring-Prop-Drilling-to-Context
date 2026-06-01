import { createContext, useContext, useState, useEffect } from "react";

// ─── User roster ──────────────────────────────────────────────────────────────
// Add new users here. themePreference drives the app theme on selection.
export const USERS = [
  {
    id: 1,
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    themePreference: "dark",
    avatarColor: "#f97316", // orange
  },
  {
    id: 2,
    name: "Jordan Lee",
    email: "jordan.lee@example.com",
    themePreference: "light",
    avatarColor: "#6366f1", // indigo
  },
];

// ─── 1. Create the Context ────────────────────────────────────────────────────
export const UserContext = createContext({
  user: USERS[0],
  users: USERS,
  selectUser: () => {},
  // favorites: { [userId]: recipeId[] }
  // Each user can have multiple favorite recipes.
  favorites: {},
  toggleFavorite: () => {},
  isFavorite: () => false,
  updateUserTheme: () => {},
});

// ─── 2. Provider Component ────────────────────────────────────────────────────
// Owns which user is active. Exposes the full roster and a selectUser()
// function so any component can switch users without prop drilling.
// Also owns per-user favorites (arrays) so every component can read/write
// them without any prop drilling.
export function UserProvider({ children, onUserChange, registerUpdateTheme }) {
  const [user, setUser] = useState(USERS[0]);

  // favorites shape: { [userId]: recipeId[] }
  // Initialise every user with an empty favorites list.
  const [favorites, setFavorites] = useState(() =>
    Object.fromEntries(USERS.map((u) => [u.id, []]))
  );

  // Per-user theme preferences — starts from the USERS roster values
  // but can be updated when the user manually toggles the theme.
  const [themePrefs, setThemePrefs] = useState(() =>
    Object.fromEntries(USERS.map((u) => [u.id, u.themePreference]))
  );

  // Register updateUserTheme with AppRoot so ThemeProvider can call it
  // when the toggle fires — without the two providers knowing about each other.
  useEffect(() => {
    registerUpdateTheme?.(updateUserTheme);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.id]);

  function selectUser(id) {
    const next = USERS.find((u) => u.id === id);
    if (!next) return;
    setUser(next);
    // Notify AppRoot so ThemeProvider syncs to this user's saved preference
    onUserChange?.(themePrefs[next.id]);
  }

  // Called by AppRoot whenever the theme toggle fires.
  // Saves the new theme as the active user's preference.
  function updateUserTheme(newTheme) {
    setThemePrefs((prev) => ({ ...prev, [user.id]: newTheme }));
    // Keep the user object's themePreference in sync for display in UserProfile
    setUser((prev) => ({ ...prev, themePreference: newTheme }));
  }

  // Toggle a recipe in/out of the active user's favorites list.
  function toggleFavorite(recipeId) {
    setFavorites((prev) => {
      const current = prev[user.id];
      const updated = current.includes(recipeId)
        ? current.filter((id) => id !== recipeId)
        : [...current, recipeId];
      return { ...prev, [user.id]: updated };
    });
  }

  // Returns true if recipeId is in the current user's favorites.
  function isFavorite(recipeId) {
    return favorites[user.id].includes(recipeId);
  }

  return (
    <UserContext.Provider
      value={{ user, users: USERS, selectUser, favorites, toggleFavorite, isFavorite, updateUserTheme }}
    >
      {children}
    </UserContext.Provider>
  );
}

// ─── 3. Convenience hook ─────────────────────────────────────────────────────
export function useUser() {
  return useContext(UserContext);
}
