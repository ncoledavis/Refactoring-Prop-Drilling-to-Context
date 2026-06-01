import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./routes/Home";
import Gallery from "./routes/Gallery";
import RecipeDetail from "./routes/RecipeDetail";
import Profiles from "./routes/Profiles";

/**
 * App is the shell component — it renders the persistent Navbar and then
 * delegates to the correct route component via React Router's <Routes>.
 *
 * ThemeProvider and UserProvider (in main.tsx) sit above this, so every
 * component here can call useTheme() or useUser() without any prop drilling.
 *
 * Notice: no `user` prop is created or passed here. UserProvider owns that
 * state and any descendant can consume it directly via useContext(UserContext).
 */
export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
        {/* Profiles demonstrates the Context API refactor:
            App → Profiles → Sidebar → UserProfile, zero prop drilling */}
        <Route path="/profiles" element={<Profiles />} />
      </Routes>
    </>
  );
}
