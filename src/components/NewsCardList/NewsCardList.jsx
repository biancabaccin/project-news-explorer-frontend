import { useState } from "react";
import "./NewsCardList.css";
import NewsCard from "../NewsCard/NewsCard";

export default function NewsCardList({
  currentUser,
  articles,
  onSave,
  onRemove,
  savedArticles,
}) {
  const [visibleCount, setVisibleCount] = useState(3);

  function handleShowMore() {
    setVisibleCount((prev) => prev + 3);
  }

  return (
    <>
      <ul className="news-card-list">
        {articles.slice(0, visibleCount).map((card) => (
          <NewsCard
            key={card.id}
            {...card}
            currentUser={currentUser}
            onSave={onSave}
            onRemove={onRemove}
            savedArticles={savedArticles}
          />
        ))}
      </ul>

      {visibleCount < articles.length && (
        <button
          className="news-card-list__more-button"
          onClick={handleShowMore}
        >
          Mostrar mais
        </button>
      )}
    </>
  );
}
