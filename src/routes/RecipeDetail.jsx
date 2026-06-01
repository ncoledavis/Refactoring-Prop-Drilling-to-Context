import { useParams, Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useUser } from "../context/UserContext";
import { recipes } from "../data/recipes";

/**
 * RecipeDetail page — shows a single recipe by :id.
 *
 * useTheme() provides the current theme so we can apply
 * dynamic inline styles that respond to the global Context value.
 * useUser() provides toggleFavorite / isFavorite so the user can
 * heart this recipe directly from the detail view.
 */
export default function RecipeDetail() {
  const { id } = useParams();

  // ── Read theme from Context ──────────────────────────────────────────────
  const { theme } = useTheme();
  // ── Read favorites helpers from UserContext ──────────────────────────────
  const { toggleFavorite, isFavorite } = useUser();

  const recipe = recipes.find((r) => r.id === id);

  // ── 404 state ────────────────────────────────────────────────────────────
  if (!recipe) {
    return (
      <main
        style={{
          fontFamily: "var(--font-sans)",
          padding: "2rem",
          backgroundColor: "var(--bg-page)",
          color: "var(--text-primary)",
          minHeight: "100vh",
        }}
      >
        <h1>Recipe Not Found</h1>
        <p>No recipe exists with id "{id}".</p>
        <Link to="/gallery" style={{ color: "var(--accent)" }}>
          ← Back to Gallery
        </Link>
      </main>
    );
  }

  return (
    <main
      style={{
        fontFamily: "var(--font-sans)",
        maxWidth: "680px",
        margin: "0 auto",
        padding: "2rem",
        // Page background responds to theme via CSS variable
        backgroundColor: "var(--bg-page)",
        color: "var(--text-primary)",
        minHeight: "100vh",
        transition: "background-color 0.25s ease, color 0.25s ease",
      }}
    >
      {/* Back navigation */}
      <Link
        to="/gallery"
        style={{
          color: "var(--accent)",
          textDecoration: "none",
          fontWeight: 700,
        }}
      >
        ← Back to Gallery
      </Link>

      {/* Recipe image */}
      <img
        src={recipe.image}
        alt={recipe.title}
        style={{
          width: "100%",
          height: "320px",
          objectFit: "cover",
          borderRadius: "10px",
          marginTop: "1.25rem",
        }}
      />

      {/* Recipe title + favorite button row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
          marginTop: "1.25rem",
          marginBottom: "0.5rem",
        }}
      >
        <h1 style={{ color: "var(--text-primary)", margin: 0 }}>
          {recipe.title}
        </h1>

        {/* ── Favorite button ── */}
        {/* Reads/writes UserContext directly — no props needed */}
        <button
          onClick={() => toggleFavorite(recipe.id)}
          aria-label={
            isFavorite(recipe.id)
              ? `Remove ${recipe.title} from favorites`
              : `Add ${recipe.title} to favorites`
          }
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.4rem",
            padding: "0.5rem 1rem",
            borderRadius: "9999px",
            border: "2px solid",
            borderColor: isFavorite(recipe.id)
              ? "var(--accent)"
              : "var(--border-color)",
            cursor: "pointer",
            fontSize: "0.875rem",
            fontWeight: 600,
            backgroundColor: isFavorite(recipe.id)
              ? "rgba(249,115,22,0.12)"
              : "transparent",
            color: isFavorite(recipe.id)
              ? "var(--accent-text)"
              : "var(--text-secondary)",
            transition: "all 0.2s ease",
            whiteSpace: "nowrap",
            flexShrink: 0,
          }}
        >
          {isFavorite(recipe.id) ? "♥ Favorited" : "♡ Favorite"}
        </button>
      </div>

      {/* Description — colour changes with theme via CSS variable */}
      <p
        style={{
          color: "var(--text-secondary)",
          marginBottom: "2rem",
          lineHeight: 1.7,
        }}
      >
        {recipe.description}
      </p>

      {/* Instructions section */}
      <section
        style={{
          padding: "1.5rem",
          borderRadius: "0.75rem",
          // Dynamic background based on Context value
          backgroundColor: theme === "dark" ? "var(--bg-card)" : "#f3f4f6",
          transition: "background-color 0.25s ease",
        }}
      >
        <h2
          style={{
            marginBottom: "0.75rem",
            color: "var(--text-primary)",
          }}
        >
          Cooking Instructions
        </h2>
        <p
          style={{
            color: "var(--text-secondary)",
            fontStyle: "italic",
          }}
        >
          Cooking instructions coming soon. Check back later!
        </p>
      </section>
    </main>
  );
}
