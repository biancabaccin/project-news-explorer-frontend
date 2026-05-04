import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import Main from "../Main/Main";
import SavedNews from "../SavedNews/SavedNews";
import Footer from "../Footer/Footer";
import CurrentUserContext from "@src/contexts/CurrentUserContext";

export default function App() {
  const [popup, setPopup] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) setCurrentUser(JSON.parse(savedUser));
  }, []);

  function handleOpenPopup(type) {
    setPopup({ type });
  }
  function handleClosePopup() {
    setPopup(null);
  }

  function handleRegister({ username, email, password }) {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const newUser = { username, email, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    setCurrentUser(newUser);
    localStorage.setItem("currentUser", JSON.stringify(newUser));
    handleClosePopup();
  }

  function handleLogin({ email, password }) {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
      (u) => u.email === email && u.password === password,
    );

    if (!user) {
      return;
    }

    setCurrentUser(user);
    localStorage.setItem("currentUser", JSON.stringify(user));
    handleClosePopup();
  }

  function handleLogout() {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
  }

  function saveCardForUser(card) {
    const saved = JSON.parse(localStorage.getItem("savedNewsByUser")) || {};
    const email = currentUser.email;
    if (!saved[email]) saved[email] = [];

    if (!saved[email].some((c) => c.id === card.id)) {
      saved[email].push(card);
    }

    localStorage.setItem("savedNewsByUser", JSON.stringify(saved));
  }

  function removeCardForUser(cardId) {
    const saved = JSON.parse(localStorage.getItem("savedNewsByUser")) || {};
    const email = currentUser.email;
    if (!saved[email]) return;

    saved[email] = saved[email].filter((c) => c.id !== cardId);
    localStorage.setItem("savedNewsByUser", JSON.stringify(saved));
  }

  function getSavedCards() {
    const saved = JSON.parse(localStorage.getItem("savedNewsByUser")) || {};
    const email = currentUser?.email;
    return email && saved[email] ? saved[email] : [];
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
                onRegister={handleRegister}
                onLogin={handleLogin}
                onLogout={handleLogout}
              />
            }
          />
          <Route
            path="/saved-news"
            element={
              <SavedNews currentUser={currentUser} onLogout={handleLogout} />
            }
          />
        </Routes>

        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}
