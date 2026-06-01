import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { recipes } from "../data/recipes";

/**
 * UserProfile is the deeply nested leaf component.
 *
 * It consumes user data and favorites directly from UserContext —
 * no props are passed down from Profiles or Sidebar.
 * This is the core benefit of the Context API: skip the middlemen.
 */
export default function UserProfile() {
  // ── Consume context directly — no props needed ───────────────────────────
  const { user, favorites, toggleFavorite } = useContext(UserContext);

  // Resolve the current user's favorited recipe objects
  const userFavoriteIds = favorites[user.id] ?? [];
  const favoriteRecipes = recipes.filter((r) => userFavoriteIds.includes(r.id));

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
      {/* Avatar */}
      <div
        style={{
          width: "3.5rem",
          height: "3.5rem",
          borderRadius: "9999px",
          backgroundColor: user.avatarColor ?? "var(--accent)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1.5rem",
          fontWeight: 700,
          color: "#ffffff",
          marginBottom: "1rem",
        }}
      >
        {user.name.charAt(0)}
      </div>

      <h3
        style={{
          fontSize: "1rem",
          fontWeight: 600,
          color: "var(--text-primary)",
          marginBottom: "0.25rem",
        }}
      >
        {user.name}
      </h3>

      <p
        style={{
          fontSize: "0.875rem",
          color: "var(--text-secondary)",
          marginBottom: "0.75rem",
        }}
      >
        {user.email}
      </p>

      <span
        style={{
          display: "inline-block",
          padding: "0.2rem 0.6rem",
          borderRadius: "9999px",
          fontSize: "0.75rem",
          fontWeight: 500,
          backgroundColor: "rgba(249,115,22,0.15)",
          color: "var(--accent-text)",
        }}
      >
        Theme: {user.themePreference}
      </span>

      {/* ── Favorite Recipes ── */}
      <div
        style={{
          marginTop: "1.25rem",
          paddingTop: "1.25rem",
          borderTop: "1px solid var(--border-color)",
        }}
      >
        <h4
          style={{
            fontSize: "0.875rem",
            fontWeight: 600,
            color: "var(--text-primary)",
            marginBottom: "0.75rem",
          }}
        >
          Favorite Recipes
          {favoriteRecipes.length > 0 && (
            <span
              style={{
                marginLeft: "0.5rem",
                padding: "0.1rem 0.5rem",
                borderRadius: "9999px",
                fontSize: "0.7rem",
                fontWeight: 600,
                backgroundColor: "rgba(249,115,22,0.15)",
                color: "var(--accent-text)",
              }}
            >
              {favoriteRecipes.length}
            </span>
          )}
        </h4>

        {favoriteRecipes.length === 0 ? (
          <p
            style={{
              fontSize: "0.8rem",
              color: "var(--text-secondary)",
              fontStyle: "italic",
            }}
          >
            No favorites saved yet. Heart a recipe in the Gallery!
          </p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {favoriteRecipes.map((recipe) => (
              <li
                key={recipe.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.6rem",
                  padding: "0.5rem 0.6rem",
                  borderRadius: "0.5rem",
                  backgroundColor: "rgba(249,115,22,0.06)",
                  border: "1px solid rgba(249,115,22,0.15)",
                }}
              >
                {/* Thumbnail */}
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  style={{
                    width: "2.5rem",
                    height: "2.5rem",
                    borderRadius: "0.375rem",
                    objectFit: "cover",
                    flexShrink: 0,
                  }}
                />

                {/* Title link */}
                <Link
                  to={`/recipe/${recipe.id}`}
                  style={{
                    flex: 1,
                    fontSize: "0.8rem",
                    fontWeight: 500,
                    color: "var(--text-primary)",
                    textDecoration: "none",
                    lineHeight: 1.3,
                  }}
                >
                  {recipe.title}
                </Link>

                {/* Remove button */}
                <button
                  onClick={() => toggleFavorite(recipe.id)}
                  aria-label={`Remove ${recipe.title} from favorites`}
                  style={{
                    flexShrink: 0,
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "0.75rem",
                    color: "var(--text-secondary)",
                    padding: "0.2rem 0.4rem",
                    borderRadius: "0.25rem",
                    transition: "color 0.2s",
                  }}
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
