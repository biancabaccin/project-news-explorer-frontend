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
