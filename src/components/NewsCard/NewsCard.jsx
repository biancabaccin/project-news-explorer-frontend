import { useState, useEffect } from "react";
import "./NewsCard.css";
import SaveTooltip from "./components/SaveTooltip/SaveTooltip";
import RemoveTooltip from "./components/RemoveTooltip/RemoveTooltip";

export default function NewsCard({
  isLoggedIn,
  isSavedNewsPage,
  onSave,
  onRemove,
  id,
  title,
  description,
  date,
  source,
  image,
}) {
  const [isSaved, setIsSaved] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("savedNewsByUser") || "{}");
    const email = JSON.parse(localStorage.getItem("currentUser"))?.email;
    const savedStatus =
      email && saved[email]
        ? saved[email].some((news) => news.id === id)
        : false;
    setIsSaved(savedStatus);
  }, [id, isLoggedIn]);

  const handleSaveClick = () => {
    if (!isLoggedIn) return;

    const email = JSON.parse(localStorage.getItem("currentUser"))?.email;
    if (!email) return;

    const saved = JSON.parse(localStorage.getItem("savedNewsByUser") || "{}");
    if (!saved[email]) saved[email] = [];

    if (isSaved) {
      saved[email] = saved[email].filter((news) => news.id !== id);
      localStorage.setItem("savedNewsByUser", JSON.stringify(saved));
      setIsSaved(false);
      onRemove?.(id);
    } else {
      saved[email].push({ id, title, description, date, source, image });
      localStorage.setItem("savedNewsByUser", JSON.stringify(saved));
      setIsSaved(true);
      onSave?.({ id, title, description, date, source, image });
    }
  };

  const handleRemoveClick = () => {
    if (!isLoggedIn) return;
    setIsSaved(false);
    onRemove?.(id);
  };

  return (
    <li className="news-card">
      <img className="news-card__image" src={image} alt={title} />

      {!isSavedNewsPage && (
        <div
          className="news-card__save-container"
          onMouseEnter={() => !isLoggedIn && setShowTooltip(true)}
          onMouseLeave={() => !isLoggedIn && setShowTooltip(false)}
        >
          {!isLoggedIn && showTooltip && <SaveTooltip />}
          <button
            className={`news-card__save-button ${isLoggedIn && isSaved ? "news-card__save-button--active" : ""}`}
            aria-label="Save News"
            type="button"
            onClick={handleSaveClick}
            disabled={!isLoggedIn}
          />
        </div>
      )}

      {isSavedNewsPage && (
        <div className="news-card__top-box">
          <p className="news-card__article-tag">ArticleTag</p>
          <div
            className="news-card__remove-container"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            {showTooltip && <RemoveTooltip />}
            <button
              className="news-card__remove-button"
              aria-label="Remove News"
              type="button"
              onClick={handleRemoveClick}
            />
          </div>
        </div>
      )}

      <div className="news-card__content">
        <div className="news-card__content-row">
          <p className="news-card__date">{date}</p>
          <p className="news-card__title">{title}</p>
        </div>
        <div className="news-card__content-row">
          <p className="news-card__description">{description}</p>
          <p className="news-card__source">{source}</p>
        </div>
      </div>
    </li>
  );
}
