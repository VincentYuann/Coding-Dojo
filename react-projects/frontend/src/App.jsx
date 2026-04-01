import "./css/App.css";
import { Routes, Route } from "react-router-dom";
import { useState, createContext } from "react";
import NavBar from "./components/NavBar";
import PrivateRouteWrapper from "./components/auth/PrivateRouteWrapper"
import { LoginForm, SignupForm, ForgotPasswordForm } from "./components/auth";
import { HomePage, SearchPage, AnimeSeasonsPage, ProfilePage, FavoritesPage, AuthPage, UpdatePasswordPage } from "./pages";
import { AuthProvider, FavoritesProvider } from "./context";

// Create a context data for the grandchild component
export const navBarSearchQueryContext = createContext();

function App() {
  const [navBarSearchQuery, setNavBarSearchQuery] = useState("");

  return (
    <>
      <AuthProvider>
        <FavoritesProvider>
          <navBarSearchQueryContext.Provider value={{ navBarSearchQuery, setNavBarSearchQuery }}>

            <header className="header">
              <NavBar />
            </header>

            <main className="main-content">
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<HomePage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/seasons/:type" element={<AnimeSeasonsPage />} />\

                {/* Private Routes */}
                <Route path="/" element={<PrivateRouteWrapper />} >
                  <Route path="/favorites" element={<FavoritesPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/update-password" element={<UpdatePasswordPage />} />
                </Route>

                {/* Authentication routes */}
                <Route path="/auth" element={<AuthPage />} >
                  <Route index element={<LoginForm />} />
                  <Route path="login" element={<LoginForm />} />
                  <Route path="signup" element={<SignupForm />} />
                  <Route path="forgot-password" element={<ForgotPasswordForm />} />
                </Route>
              </Routes>
            </main>

            <footer className="footer">
              <p>© {new Date().getFullYear()} AnimY - Vincent Yuan.</p>
            </footer>

          </navBarSearchQueryContext.Provider>
        </FavoritesProvider>
      </AuthProvider>
    </>
  );
}

export default App;
