import Sidebar from "../components/Sidebar";
import UserSwitcher from "../components/UserSwitcher";

/**
 * Profiles is the top of the prop-drilling demo tree.
 *
 * Before refactoring, it would have received a `user` prop from App
 * and forwarded it down to Sidebar → UserProfile without ever using it.
 *
 * After refactoring: Profiles receives NO user-related props.
 * The data flows through UserContext instead, and only UserProfile
 * (the component that actually needs it) consumes it.
 */
export default function Profiles() {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "var(--bg-page)",
        padding: "2.5rem 1.5rem",
        transition: "background-color 0.25s ease",
      }}
    >
      <div style={{ maxWidth: "80rem", margin: "0 auto" }}>
        {/* Page header */}
        <div style={{ marginBottom: "2rem" }}>
          <h1
            style={{
              fontSize: "2rem",
              fontWeight: 700,
              color: "var(--text-primary)",
              letterSpacing: "-0.025em",
            }}
          >
            Profiles
          </h1>
          <p style={{ marginTop: "0.5rem", color: "var(--text-secondary)" }}>
            Demonstrating the Context API refactor. The component tree is{" "}
            <strong style={{ color: "var(--text-primary)" }}>
              App → Profiles → Sidebar → UserProfile
            </strong>
            . Neither Profiles nor Sidebar receives or forwards a{" "}
            <code
              style={{
                backgroundColor: "var(--bg-card)",
                padding: "0.1rem 0.4rem",
                borderRadius: "0.25rem",
                fontSize: "0.875rem",
              }}
            >
              user
            </code>{" "}
            prop — UserProfile reads from{" "}
            <code
              style={{
                backgroundColor: "var(--bg-card)",
                padding: "0.1rem 0.4rem",
                borderRadius: "0.25rem",
                fontSize: "0.875rem",
              }}
            >
              UserContext
            </code>{" "}
            directly.
          </p>
        </div>

        {/* Main layout: content area + sidebar */}
        <div style={{ display: "flex", gap: "2rem", alignItems: "flex-start" }}>
          {/* Main content */}
          <main
            style={{
              flex: 1,
              padding: "1.5rem",
              borderRadius: "0.75rem",
              backgroundColor: "var(--bg-card)",
              border: "1px solid var(--border-color)",
              transition: "background-color 0.25s ease",
            }}
          >
            <h2
              style={{
                fontSize: "1.25rem",
                fontWeight: 600,
                color: "var(--text-primary)",
                marginBottom: "1rem",
              }}
            >
              Main Content Area
            </h2>
            <p style={{ color: "var(--text-secondary)", lineHeight: 1.7 }}>
              This panel represents the main content of the profiles page. It sits
              alongside the Sidebar but has no knowledge of the user object —
              that concern belongs entirely to UserProfile via context.
            </p>

            {/* Prop drilling comparison callout */}
            <div
              style={{
                marginTop: "1.5rem",
                padding: "1rem",
                borderRadius: "0.5rem",
                backgroundColor: "rgba(249,115,22,0.08)",
                borderLeft: "3px solid var(--accent)",
              }}
            >
              <p
                style={{
                  fontSize: "0.875rem",
                  color: "var(--text-secondary)",
                  lineHeight: 1.6,
                }}
              >
                <strong style={{ color: "var(--accent-text)" }}>
                  Before (prop drilling):
                </strong>{" "}
                App passed{" "}
                <code style={{ fontSize: "0.8rem" }}>user</code> → Profiles →
                Sidebar → UserProfile. Profiles and Sidebar were just
                middlemen.
              </p>
              <p
                style={{
                  marginTop: "0.5rem",
                  fontSize: "0.875rem",
                  color: "var(--text-secondary)",
                  lineHeight: 1.6,
                }}
              >
                <strong style={{ color: "var(--accent-text)" }}>
                  After (Context API):
                </strong>{" "}
                UserProvider wraps the tree. UserProfile calls{" "}
                <code style={{ fontSize: "0.8rem" }}>useContext(UserContext)</code>{" "}
                and gets the data directly — no middlemen needed.
              </p>
            </div>

            {/* User switcher — also reads/writes context directly */}
            <div style={{ marginTop: "1.5rem" }}>
              <UserSwitcher />
            </div>
          </main>

          {/* Sidebar — no user prop passed */}
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
