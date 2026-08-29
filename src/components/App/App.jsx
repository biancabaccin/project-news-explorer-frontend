import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import Main from "../Main/Main";
import SavedNews from "../SavedNews/SavedNews";
import Footer from "../Footer/Footer";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

import CurrentUserContext from "@src/contexts/CurrentUserContext";
import newsApi from "@src/utils/NewsApi";
import mainApi from "@src/utils/MainApi";

export default function App() {
  const [popup, setPopup] = useState(null);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchDone, setSearchDone] = useState(false);

  const [currentUser, setCurrentUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("currentUser")) || null;
    } catch {
      return null;
    }
  });

  const [savedArticles, setSavedArticles] = useState([]);

  useEffect(() => {
    async function loadSavedArticles() {
      if (!currentUser) {
        setSavedArticles([]);
        return;
      }

      try {
        const saved = await mainApi.getSavedArticles();
        setSavedArticles(saved);
      } catch (err) {
        console.error("Error loading saved articles:", err);
        setSavedArticles([]);
      }
    }

    loadSavedArticles();
  }, [currentUser]);

  async function handleSearch(query) {
    if (!query.trim()) {
      setError("Please enter a keyword");
      return;
    }

    setLoading(true);
    setError("");
    setSearchDone(false);

    try {
      const data = await newsApi.getEverything(query);

      const formatted = data.articles.map((item, index) => ({
        id: index + item.title,
        title: item.title,
        text: item.description || item.title || "No description available",
        description: item.description || "No description available",
        source: item.source.name,
        date: item.publishedAt,
        image: item.urlToImage,
        link: item.url,
        keyword: query,
      }));
      setArticles(formatted);
      setSearchDone(true);
    } catch (err) {
      console.error(err);

      setError(
        err?.message ||
          "Sorry, something went wrong during the request. Please try again later.",
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleSaveArticle(article) {
    try {
      const alreadySaved = savedArticles.some(
        (item) => item.link === article.link,
      );

      if (alreadySaved) {
        return;
      }

      const savedArticle = await mainApi.saveArticle(article);

      setSavedArticles((prev) => {
        const exists = prev.some((item) => item.link === savedArticle.link);

        if (exists) {
          return prev;
        }

        return [...prev, savedArticle];
      });
    } catch (err) {
      console.error("Error saving article:", err);
    }
  }

  async function handleDeleteArticle(id) {
    try {
      await mainApi.deleteArticle(id);

      setSavedArticles((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.error("Error removing article:", err);
    }
  }

  async function handleLogin({ email, password }) {
    try {
      const data = await mainApi.login(email, password);

      localStorage.setItem("token", data.token);

      const userData = await mainApi.getMe();

      setCurrentUser(userData);
      localStorage.setItem("currentUser", JSON.stringify(userData));

      setPopup(null);

      return null;
    } catch (err) {
      return err.message || "Invalid email or password";
    }
  }

  function handleLogout() {
    setCurrentUser(null);
    setSavedArticles([]);
    localStorage.removeItem("currentUser");
    localStorage.removeItem("token");
    setArticles([]);
    setSearchDone(false);
    setError("");
  }

  async function handleRegister({ name, email, password }) {
    try {
      await mainApi.register(email, password, name);

      return {
        success: true,
      };
    } catch (err) {
      return {
        success: false,
        message: err.message || "Error registering user",
      };
    }
  }

  function handleOpenPopup(type) {
    setPopup({ type });
  }

  function handleClosePopup() {
    setPopup(null);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
          <Route
            path="/"
            element={
              <Main
                popup={popup}
                onOpenPopup={handleOpenPopup}
                onClosePopup={handleClosePopup}
                currentUser={currentUser}
                onLogin={handleLogin}
                onRegister={handleRegister}
                onLogout={handleLogout}
                onSearch={handleSearch}
                articles={articles}
                loading={loading}
                error={error}
                searchDone={searchDone}
                savedArticles={savedArticles}
                onSaveArticle={handleSaveArticle}
                onDeleteArticle={handleDeleteArticle}
              />
            }
          />

          <Route
            path="/saved-news"
            element={
              <ProtectedRoute
                currentUser={currentUser}
                onOpenPopup={handleOpenPopup}
              >
                <SavedNews
                  savedArticles={savedArticles}
                  onDelete={handleDeleteArticle}
                  onLogout={handleLogout}
                />
              </ProtectedRoute>
            }
          />
        </Routes>

        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}
