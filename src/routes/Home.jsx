import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { recipes } from "../data/recipes";

/**
 * Home page — hero section + featured recipe strip.
 *
 * useTheme() pulls `theme` from ThemeContext so we can apply
 * different inline styles based on the current theme value.
 * The CSS variables in app.css handle most of the heavy lifting;
 * inline styles are used here for values that need JS logic.
 */
export default function Home() {
  // ── Read theme from Context ──────────────────────────────────────────────
  const { theme } = useTheme();

  // Dynamic card style based on current theme
  const cardStyle = {
    display: "block",
    borderRadius: "1rem",
    overflow: "hidden",
    boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
    textDecoration: "none",
    // Apply different background based on Context value
    backgroundColor: theme === "dark" ? "var(--bg-card)" : "#ffffff",
    transition: "box-shadow 0.3s ease, background-color 0.25s ease",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "var(--bg-page)",
        display: "flex",
        flexDirection: "column",
        transition: "background-color 0.25s ease",
      }}
    >
      {/* ── Hero ── */}
      <section
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "8rem 1.5rem",
          overflow: "hidden",
        }}
      >
        {/* Blurred background image */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "brightness(0.35) blur(2px)",
            transform: "scale(1.05)",
          }}
        />

        {/* Content above overlay */}
        <div style={{ position: "relative", zIndex: 10, maxWidth: "42rem" }}>
          <span
            style={{
              display: "inline-block",
              marginBottom: "1rem",
              padding: "0.25rem 0.75rem",
              borderRadius: "9999px",
              backgroundColor: "rgba(249,115,22,0.2)",
              color: "var(--accent-text)",
              fontSize: "0.875rem",
              fontWeight: 500,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            Fresh &amp; Delicious
          </span>

          <h1
            style={{
              fontSize: "clamp(2.5rem, 6vw, 3.75rem)",
              fontWeight: 800,
              color: "#ffffff",
              lineHeight: 1.15,
            }}
          >
            Cook Something{" "}
            <span style={{ color: "var(--accent-text)" }}>Amazing</span> Today
          </h1>

          <p
            style={{
              marginTop: "1.25rem",
              fontSize: "1.125rem",
              color: "#d1d5db",
              lineHeight: 1.7,
            }}
          >
            Browse our growing collection of hand-picked recipes — from quick
            weeknight dinners to weekend showstoppers.
          </p>

          <Link
            to="/gallery"
            style={{
              display: "inline-block",
              marginTop: "2rem",
              padding: "0.75rem 2rem",
              borderRadius: "9999px",
              backgroundColor: "var(--accent)",
              color: "#ffffff",
              fontWeight: 600,
              fontSize: "1rem",
              transition: "background-color 0.2s ease",
              boxShadow: "0 10px 15px -3px rgba(0,0,0,0.3)",
            }}
          >
            Browse All Recipes →
          </Link>
        </div>
      </section>

      {/* ── Featured recipes strip ── */}
      <section
        style={{
          padding: "4rem 1.5rem",
          maxWidth: "80rem",
          margin: "0 auto",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "2rem",
          }}
        >
          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: 700,
              // Dynamic text colour from Context-driven CSS variable
              color: "var(--text-primary)",
            }}
          >
            Featured Recipes
          </h2>
          <Link
            to="/gallery"
            style={{
              fontSize: "0.875rem",
              color: "var(--accent)",
              fontWeight: 500,
            }}
          >
            View all →
          </Link>
        </div>

        {/* Recipe cards grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {recipes.slice(0, 3).map((recipe) => (
            <Link key={recipe.id} to={`/recipe/${recipe.id}`} style={cardStyle}>
              <div style={{ overflow: "hidden", height: "12rem" }}>
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.5s ease",
                  }}
                />
              </div>
              <div style={{ padding: "1rem" }}>
                <h3
                  style={{
                    fontSize: "1.125rem",
                    fontWeight: 600,
                    color: "var(--text-primary)",
                    transition: "color 0.2s",
                  }}
                >
                  {recipe.title}
                </h3>
                <p
                  style={{
                    marginTop: "0.25rem",
                    fontSize: "0.875rem",
                    color: "var(--text-secondary)",
                    lineHeight: 1.6,
                  }}
                >
                  {recipe.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Footer ── */}
      <footer
        style={{
          marginTop: "auto",
          padding: "1.5rem",
          textAlign: "center",
          fontSize: "0.875rem",
          color: "var(--text-secondary)",
          borderTop: "1px solid var(--border-color)",
          transition: "border-color 0.25s ease, color 0.25s ease",
        }}
      >
        © {new Date().getFullYear()} Recipe Gallery · Built with React Router
      </footer>
    </div>
  );
}
