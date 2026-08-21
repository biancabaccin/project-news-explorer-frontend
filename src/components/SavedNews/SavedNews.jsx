import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./SavedNews.css";

import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader";
import NewsCard from "../NewsCard/NewsCard";
import CurrentUserContext from "@src/contexts/CurrentUserContext";

export default function SavedNews({ savedArticles, onDelete, onLogout }) {
  const currentUser = useContext(CurrentUserContext);
  const navigate = useNavigate();

  function handleLogoutClick() {
    onLogout();
    navigate("/");
  }

  return (
    <div className="saved-news">
      <SavedNewsHeader
        currentUser={currentUser}
        onLogout={handleLogoutClick}
        savedArticles={savedArticles}
      />

      <div className="saved-news__cards">
        {savedArticles.length === 0 ? (
          <p className="saved-news__empty"> {"Nenhum artigo salvo ainda :("}</p>
        ) : (
          savedArticles.map((card) => (
            <NewsCard
              key={card._id}
              {...card}
              currentUser={currentUser}
              isSavedNewsPage={true}
              onRemove={onDelete}
            />
          ))
        )}
      </div>
    </div>
  );
}
