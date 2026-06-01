# Recipe Gallery - Theme Switcher

A React application that demonstrates global theme management using the Context API. It is built on top of a Recipe Gallery app and adds a light/dark mode toggle that applies across every page without prop drilling.

## What it does

The app uses React's `createContext` to create a global theme state that any component in the tree can read. A custom `ThemeProvider` component manages the toggle logic and writes a `data-theme` attribute to the root HTML element whenever the theme changes. CSS custom properties keyed off that attribute handle the visual switch, so the entire page updates at once.

The toggle button lives in the navbar and persists your preference to `localStorage`, so it is remembered on page refresh.

## Project structure

```
src/
  context/
    ThemeContext.jsx    - createContext, ThemeProvider, and useTheme hook
  components/
    Navbar.jsx          - navbar with the theme toggle button
  routes/
    Home.jsx            - home page with hero and featured recipes
    Gallery.jsx         - full recipe grid
    RecipeDetail.jsx    - single recipe detail view
  data/
    recipes.js          - shared recipe data
  App.jsx               - route definitions
  main.tsx              - app entry point
  app.css               - CSS custom properties for light and dark themes
```

## Setup

**Requirements:** Node.js 18 or higher

1. Clone the repository and navigate into the project folder.

```bash
git clone <your-repo-url>
cd theme-switcher-app
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

## How the theme system works

1. `ThemeContext.jsx` calls `createContext` to create the context object and exports it along with the `ThemeProvider` component and a `useTheme` convenience hook.
2. `ThemeProvider` wraps the entire app in `main.tsx`. It holds the `theme` state, runs a `useEffect` to sync it to `localStorage` and to `document.documentElement`, and passes both `theme` and `toggleTheme` down through the context.
3. Any component that needs the theme calls `useTheme()` to get the current value and the toggle function, with no prop drilling required.
4. `app.css` defines CSS custom properties under `:root` for light mode and overrides them under `[data-theme="dark"]`. Because every component references these variables, the visual update is instant and global.
