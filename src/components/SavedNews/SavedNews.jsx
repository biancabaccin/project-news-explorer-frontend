import { useNavigate } from "react-router-dom";
import "./SavedNews.css";

import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader";
import NewsCard from "../NewsCard/NewsCard";

export default function SavedNews({
  currentUser,
  savedArticles,
  onDelete,
  onLogout,
}) {
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
              key={card.id}
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
