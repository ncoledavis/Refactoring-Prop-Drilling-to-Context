import { useContext } from "react";
import { UserContext } from "../context/UserContext";

/**
 * UserSwitcher reads the full user roster and the active user from
 * UserContext, then calls selectUser() when a different account is chosen.
 *
 * No props — everything comes straight from context.
 * Switching users also triggers the app theme to update automatically
 * because UserProvider calls onUserChange → AppRoot → ThemeProvider.
 */
export default function UserSwitcher() {
  const { user, users, selectUser } = useContext(UserContext);

  return (
    <div
      style={{
        padding: "1.5rem",
        borderRadius: "0.75rem",
        backgroundColor: "var(--bg-card)",
        border: "1px solid var(--border-color)",
        transition: "background-color 0.25s ease",
      }}
    >
      <h3
        style={{
          fontSize: "0.75rem",
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          color: "var(--text-secondary)",
          marginBottom: "1rem",
        }}
      >
        Switch Account
      </h3>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
        {users.map((u) => {
          const isActive = u.id === user.id;
          return (
            <button
              key={u.id}
              onClick={() => selectUser(u.id)}
              aria-pressed={isActive}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                padding: "0.75rem 1rem",
                borderRadius: "0.625rem",
                border: isActive
                  ? "2px solid var(--accent)"
                  : "2px solid var(--border-color)",
                backgroundColor: isActive
                  ? "rgba(249,115,22,0.08)"
                  : "transparent",
                cursor: isActive ? "default" : "pointer",
                textAlign: "left",
                width: "100%",
                transition: "border-color 0.2s ease, background-color 0.2s ease",
              }}
            >
              {/* Avatar */}
              <div
                style={{
                  width: "2.25rem",
                  height: "2.25rem",
                  borderRadius: "9999px",
                  backgroundColor: u.avatarColor,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.875rem",
                  fontWeight: 700,
                  color: "#ffffff",
                  flexShrink: 0,
                }}
              >
                {u.name.charAt(0)}
              </div>

              {/* Name + email */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <p
                  style={{
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    color: "var(--text-primary)",
                    margin: 0,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {u.name}
                </p>
                <p
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--text-secondary)",
                    margin: 0,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {u.email}
                </p>
              </div>

              {/* Theme badge */}
              <span
                style={{
                  fontSize: "0.7rem",
                  fontWeight: 500,
                  padding: "0.15rem 0.5rem",
                  borderRadius: "9999px",
                  backgroundColor:
                    u.themePreference === "dark"
                      ? "rgba(99,102,241,0.15)"
                      : "rgba(234,179,8,0.15)",
                  color:
                    u.themePreference === "dark" ? "#818cf8" : "#ca8a04",
                  flexShrink: 0,
                }}
              >
                {u.themePreference === "dark" ? "dark" : "light"}
              </span>

              {/* Active indicator */}
              {isActive && (
                <span
                  style={{
                    fontSize: "0.7rem",
                    fontWeight: 600,
                    color: "var(--accent-text)",
                    flexShrink: 0,
                  }}
                >
                  active
                </span>
              )}
            </button>
          );
        })}
      </div>

      <p
        style={{
          marginTop: "0.875rem",
          fontSize: "0.7rem",
          color: "var(--text-secondary)",
          fontStyle: "italic",
          lineHeight: 1.5,
        }}
      >
        Selecting a user updates UserContext and automatically applies their
        theme preference across the app.
      </p>
    </div>
  );
}
