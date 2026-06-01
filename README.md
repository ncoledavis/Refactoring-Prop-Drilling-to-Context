# Recipe Gallery - Context API Refactor

A React application that started as a theme-switcher demo and has been expanded to demonstrate a full Context API refactor. The app now manages global theme state, multi-user profiles, and per-user recipe favorites — all without prop drilling.
YouTube Link: https://youtu.be/HFkJmSmqMBE

## What changed from the original

The original project only had `ThemeContext` and a light/dark toggle. Here is everything that has been added or changed on top of that starting point.

### UserContext (new)

A second context, `UserContext`, was added to manage a roster of users and which one is currently active. Any component in the tree can read the active user or switch users without receiving props from a parent.

`UserProvider` exposes:
- `user` — the currently active user object
- `users` — the full user roster
- `selectUser(id)` — switches the active user and syncs the theme to their saved preference
- `favorites` — a map of `{ userId: recipeId[] }` so each user has their own independent list of saved recipes
- `toggleFavorite(recipeId)` — adds or removes a recipe from the active user's favorites
- `isFavorite(recipeId)` — returns true if the active user has saved that recipe
- `updateUserTheme(theme)` — updates the active user's stored theme preference

### Theme preference is now per-user

When you toggle light/dark mode, the new theme is saved to the active user's profile. When you switch users, the app loads that user's last saved theme preference. Each user remembers their own setting independently.

### Profiles page (renamed from Dashboard)

The route `/dashboard` has been renamed to `/profiles` and the page has been updated to reflect that. The page still demonstrates the Context API component tree (`App → Profiles → Sidebar → UserProfile`) but now the `UserProfile` component also shows each user's saved favorite recipes.

### Favorite recipes

Each recipe card in the Gallery has a heart button in the top-right corner of the thumbnail. The RecipeDetail page has a Favorite button next to the recipe title. Clicking either one adds or removes that recipe from the active user's favorites list. Favorites are stored per-user, so Alex and Jordan each have their own independent list.

The Navbar shows a live count of the active user's saved favorites and links directly to the Profiles page.

### Local image asset

The Avocado Toast recipe previously used a broken external image URL. It now loads from a local file at `src/assets/avocado-toast.jpg`.

## Project structure

```
src/
  context/
    ThemeContext.jsx    - createContext, ThemeProvider, useTheme hook
    UserContext.jsx     - createContext, UserProvider, useUser hook (new)
  components/
    Navbar.jsx          - navbar with theme toggle and favorites count pill
    Sidebar.jsx         - layout sidebar (passes no user props)
    UserProfile.jsx     - displays active user info and their saved favorites
    UserSwitcher.jsx    - buttons to switch the active user
  routes/
    Home.jsx            - home page with hero and featured recipes
    Gallery.jsx         - full recipe grid with per-recipe favorite buttons
    RecipeDetail.jsx    - single recipe detail view with favorite button
    Profiles.jsx        - profiles page showing the Context API tree
  data/
    recipes.js          - shared recipe data
  assets/
    avocado-toast.jpg   - local image asset (new)
  App.jsx               - route definitions
  main.tsx              - app entry point, AppRoot wires ThemeProvider and UserProvider together
  app.css               - CSS custom properties for light and dark themes
```

## Setup

**Requirements:** Node.js 18 or higher

1. Clone the repository and navigate into the project folder.

```bash
git clone <your-repo-url>
cd context-refractor-app
```

2. Install dependencies.

```bash
npm install
```

3. Start the development server.

```bash
npm run dev
```

4. Open your browser to `http://localhost:5173`.

## Available scripts

| Script | Description |
|---|---|
| `npm run dev` | Starts the local development server |
| `npm run build` | Builds the app for production |
| `npm run preview` | Previews the production build locally |

## How the context system works

### Theme

1. `ThemeContext.jsx` creates the context and exports `ThemeProvider` and `useTheme`.
2. `ThemeProvider` holds the `theme` state, syncs it to `localStorage` and `document.documentElement`, and calls `onThemeChange` whenever the toggle fires so `AppRoot` can forward the new value to `UserProvider`.
3. `app.css` defines CSS custom properties under `:root` for light mode and overrides them under `[data-theme="dark"]`.

### Users and favorites

1. `UserContext.jsx` creates the context and exports `UserProvider` and `useUser`.
2. `UserProvider` holds the active user, per-user theme preferences, and per-user favorites arrays.
3. `AppRoot` in `main.tsx` sits between the two providers and coordinates them — when the theme toggle fires it calls `updateUserTheme` on `UserProvider`, and when a user is switched it passes that user's saved theme preference back to `ThemeProvider` via `initialTheme`.
4. Components that need user data or favorites call `useUser()` directly — no props are passed through intermediate components.
