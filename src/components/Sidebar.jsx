import UserProfile from "./UserProfile";

/**
 * Sidebar sits between Dashboard and UserProfile in the component tree.
 *
 * Notice: it receives NO props related to the user.
 * It simply renders UserProfile, which pulls user data from context itself.
 * This eliminates the "pass-through" prop that would otherwise be needed here.
 */
export default function Sidebar() {
  return (
    <aside
      style={{
        width: "260px",
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <h2
        style={{
          fontSize: "0.75rem",
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          color: "var(--text-secondary)",
          marginBottom: "0.25rem",
        }}
      >
        Sidebar
      </h2>

      {/* No user prop passed — UserProfile reads context directly */}
      <UserProfile />

      <p
        style={{
          fontSize: "0.75rem",
          color: "var(--text-secondary)",
          fontStyle: "italic",
          lineHeight: 1.5,
        }}
      >
        Sidebar does not receive or forward any user props. UserProfile
        consumes UserContext on its own.
      </p>
    </aside>
  );
}
