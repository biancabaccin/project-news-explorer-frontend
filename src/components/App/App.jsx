import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import Main from "../Main/Main";
import SavedNews from "../SavedNews/SavedNews";
import Footer from "../Footer/Footer";
import CurrentUserContext from "@src/contexts/CurrentUserContext";
import newsApi from "@src/utils/NewsApi";

export default function App() {
  const [popup, setPopup] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchDone, setSearchDone] = useState(false);

  const [savedArticles, setSavedArticles] = useState([]);

  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) setCurrentUser(JSON.parse(savedUser));

    const saved = JSON.parse(localStorage.getItem("savedNews")) || [];

    setSavedArticles(saved);
  }, []);

  async function handleSearch(query) {
    if (!query.trim()) {
      setError("Por favor, insira uma palavra-chave");
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
        description: item.description,
        source: item.source.name,
        date: item.publishedAt,
        image: item.urlToImage,
        keyword: query,
      }));

      setArticles(formatted);
      setSearchDone(true);
    } catch (err) {
      setError(
        "Desculpe, algo deu errado durante a solicitação. Tente novamente mais tarde.",
      );
    } finally {
      setLoading(false);
    }
  }

  function handleSaveArticle(article) {
    setSavedArticles((prev) => {
      const exists = prev.some((a) => a.id === article.id);

      let updated;

      if (exists) {
        updated = prev.filter((a) => a.id !== article.id);
      } else {
        updated = [...prev, article];
      }

      localStorage.setItem("savedNews", JSON.stringify(updated));
      return updated;
    });
  }

  function handleDeleteArticle(id) {
    setSavedArticles((prev) => {
      const updated = prev.filter((item) => item.id !== id);

      localStorage.setItem("savedNews", JSON.stringify(updated));
      return updated;
    });
  }

  function handleLogin({ email, password }) {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
      (u) => u.email === email && u.password === password,
    );

    if (!user) return "Invalid email or password";

    setCurrentUser(user);
    localStorage.setItem("currentUser", JSON.stringify(user));
    setPopup(null);

    return null;
  }

  function handleLogout() {
    setCurrentUser(null);

    localStorage.removeItem("currentUser");

    setArticles([]);
    setSearchDone(false);
    setError("");
  }

  function handleRegister({ username, email, password }) {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const existingUser = users.find(
      (user) => user.email.toLowerCase() === email.toLowerCase(),
    );

    if (existingUser) {
      return {
        success: false,
        message: "Este e-mail não está disponível",
      };
    }

    const newUser = {
      username,
      email,
      password,
    };

    users.push(newUser);

    localStorage.setItem("users", JSON.stringify(users));

    return {
      success: true,
    };
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
              <SavedNews
                currentUser={currentUser}
                savedArticles={savedArticles}
                onDelete={handleDeleteArticle}
                onLogout={handleLogout}
              />
            }
          />
        </Routes>

        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}
