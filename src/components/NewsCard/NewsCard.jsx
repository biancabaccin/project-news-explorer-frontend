import { useState, useEffect } from "react";
import "./NewsCard.css";

import SaveTooltip from "./components/SaveTooltip/SaveTooltip";
import RemoveTooltip from "./components/RemoveTooltip/RemoveTooltip";

export default function NewsCard({
  id,
  title,
  description,
  date,
  source,
  image,
  keyword,
  currentUser,
  isSavedNewsPage,
  onSave,
  onRemove,
  savedArticles,
}) {
  const [isSaved, setIsSaved] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    if (!currentUser) {
      setIsSaved(false);
      return;
    }

    const exists = savedArticles?.some((item) => item.id === id);

    setIsSaved(exists);
  }, [savedArticles, id, currentUser]);

  function handleSaveClick() {
    if (!currentUser) return;

    const article = {
      id,
      title,
      description,
      date,
      source,
      image,
      keyword,
    };

    if (isSaved) {
      setIsSaved(false);
      onRemove?.(id);
      return;
    }

    setIsSaved(true);
    onSave?.(article);
  }

  function handleRemoveClick() {
    onRemove?.(id);
    setIsSaved(false);
  }

  function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  return (
    <li className="news-card">
      <img className="news-card__image" src={image} alt={title} />

      {!isSavedNewsPage && (
        <div
          className="news-card__save-container"
          onMouseEnter={() => !currentUser && setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          {!currentUser && showTooltip && <SaveTooltip />}

          <button
            className={`news-card__save-button
              ${currentUser && isSaved ? "news-card__save-button--active" : ""}
              ${!currentUser ? "news-card__save-button--logged-out" : ""}
            `}
            onClick={handleSaveClick}
            aria-label="Salvar artigo"
          />
        </div>
      )}

      {isSavedNewsPage && (
        <div className="news-card__top-box">
          <p className="news-card__article-tag">{keyword}</p>

          <div
            className="news-card__remove-container"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            {showTooltip && <RemoveTooltip />}

            <button
              className="news-card__remove-button"
              onClick={handleRemoveClick}
              aria-label="Remover artigo"
            />
          </div>
        </div>
      )}

      <div className="news-card__content">
        <div className="news-card__content-row">
          <p className="news-card__date">{formatDate(date)}</p>
          <h3 className="news-card__title">{title}</h3>
        </div>

        <div className="news-card__content-row">
          <p className="news-card__description">{description}</p>
          <p className="news-card__source">{source}</p>
        </div>
      </div>
    </li>
  );
}
