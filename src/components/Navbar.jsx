import { NavLink, Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useUser } from "../context/UserContext";

/**
 * Navbar reads `theme` and `toggleTheme` from ThemeContext.
 * It also reads the current user's favorite recipe from UserContext
 * and displays a quick-link to it in the nav bar.
 *
 * - The nav background uses the --bg-nav CSS variable (defined in app.css),
 *   so it automatically reflects the active theme.
 * - The toggle button shows a sun/moon icon and calls toggleTheme()
 *   on click — no prop drilling needed.
 */
export default function Navbar() {
  // ── Consume the contexts ─────────────────────────────────────────────────
  const { theme, toggleTheme } = useTheme();
  const { user, favorites } = useUser();

  // Look up the current user's favorite recipe count
  const favoriteCount = (favorites[user.id] ?? []).length;

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        gap: "1.5rem",
        padding: "1rem 1.5rem",
        backgroundColor: "var(--bg-nav)",
        boxShadow: "0 4px 6px -1px rgba(0,0,0,0.4)",
        transition: "background-color 0.25s ease",
      }}
    >
      {/* Brand */}
      <span
        style={{
          color: "var(--accent-text)",
          fontWeight: 700,
          fontSize: "1.125rem",
          marginRight: "auto",
          letterSpacing: "-0.025em",
        }}
      >
        Recipe Gallery
      </span>

      {/* Nav links */}
      <NavLink to="/" end style={navLinkStyle}>
        {({ isActive }) => (
          <span style={isActive ? activeLinkStyle : inactiveLinkStyle}>Home</span>
        )}
      </NavLink>

      <NavLink to="/gallery" style={navLinkStyle}>
        {({ isActive }) => (
          <span style={isActive ? activeLinkStyle : inactiveLinkStyle}>Gallery</span>
        )}
      </NavLink>

      <NavLink to="/profiles" style={navLinkStyle}>
        {({ isActive }) => (
          <span style={isActive ? activeLinkStyle : inactiveLinkStyle}>Profiles</span>
        )}
      </NavLink>

      {/* ── Favorite recipe pill ────────────────────────────────────────── */}
      {/* Shows the active user's favorite count as a link to their profile.
          Reads from UserContext — no props needed. */}
      <Link
        to="/profiles"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.35rem",
          padding: "0.375rem 0.75rem",
          borderRadius: "9999px",
          backgroundColor: favoriteCount > 0
            ? "rgba(249,115,22,0.15)"
            : "rgba(255,255,255,0.05)",
          color: favoriteCount > 0 ? "var(--accent-text)" : "var(--text-secondary)",
          fontSize: "0.8rem",
          fontWeight: 500,
          textDecoration: "none",
          border: favoriteCount > 0
            ? "1px solid rgba(249,115,22,0.3)"
            : "1px solid var(--border-color)",
          transition: "background-color 0.2s ease",
          whiteSpace: "nowrap",
        }}
        title={`${user.name}'s favorites`}
      >
        {favoriteCount > 0 ? `♥ ${favoriteCount} Saved` : "♡ No favorites"}
      </Link>

      {/* ── Theme toggle button ──────────────────────────────────────────── */}
      {/* Reads `theme` from context to show the correct icon,
          calls `toggleTheme` to flip the global state */}
      <button
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.4rem",
          padding: "0.375rem 0.75rem",
          borderRadius: "9999px",
          border: "none",
          cursor: "pointer",
          fontSize: "0.875rem",
          fontWeight: 500,
          backgroundColor: "var(--toggle-bg)",
          color: "var(--toggle-text)",
          transition: "background-color 0.25s ease, color 0.25s ease",
        }}
      >
        {/* Label reflects current theme value from Context */}
        {theme === "light" ? "Dark" : "Light"}
      </button>
    </nav>
  );
}

// ── Shared link styles ────────────────────────────────────────────────────────
const navLinkStyle = { textDecoration: "none" };

const activeLinkStyle = {
  fontSize: "0.875rem",
  fontWeight: 500,
  color: "var(--accent-text)",
  borderBottom: "2px solid var(--accent-text)",
  paddingBottom: "2px",
  transition: "color 0.2s",
};

const inactiveLinkStyle = {
  fontSize: "0.875rem",
  fontWeight: 500,
  color: "var(--text-nav)",
  borderBottom: "2px solid transparent",
  paddingBottom: "2px",
  transition: "color 0.2s",
};
