import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SavedNews.css";

import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader";
import NewsCard from "../NewsCard/NewsCard";

export default function SavedNews({ currentUser, onLogout }) {
  const navigate = useNavigate();
  const [savedCards, setSavedCards] = useState([]);

  useEffect(() => {
    if (currentUser) {
      const saved = JSON.parse(localStorage.getItem("savedNewsByUser")) || {};
      const email = currentUser.email;
      setSavedCards(email && saved[email] ? saved[email] : []);
    }
  }, [currentUser]);

  const handleLogoutClick = () => {
    onLogout();
    navigate("/");
  };

  const handleRemoveCard = (id) => {
    const saved = JSON.parse(localStorage.getItem("savedNewsByUser")) || {};
    const email = currentUser.email;
    if (!saved[email]) return;

    saved[email] = saved[email].filter((c) => c.id !== id);
    localStorage.setItem("savedNewsByUser", JSON.stringify(saved));

    setSavedCards((prev) => prev.filter((card) => card.id !== id));
  };

  return (
    <div className="saved-news">
      <SavedNewsHeader currentUser={currentUser} onLogout={handleLogoutClick} />

      <div className="saved-news__cards">
        {savedCards.map((card) => (
          <NewsCard
            key={card.id}
            {...card}
            isLoggedIn={!!currentUser}
            isSavedNewsPage={true}
            onRemove={handleRemoveCard}
          />
        ))}
      </div>
    </div>
  );
}
