import "./SavedNewsHeader.css";
import Header from "../Header/Header";

export default function SavedNewsHeader({
  currentUser,
  onLogout,
  savedArticles,
}) {
  const count = savedArticles.length;
  const keywords = savedArticles
    .map((item) => item.keyword || "")
    .filter((k) => k.trim() !== "");

  const keywordCount = keywords.reduce((acc, keyword) => {
    acc[keyword] = (acc[keyword] || 0) + 1;
    return acc;
  }, {});

  const sortedKeywords = Object.entries(keywordCount)
    .sort((a, b) => b[1] - a[1])
    .map(([keyword]) => keyword);

  const showKeywords =
    sortedKeywords.length >= 4
      ? sortedKeywords.slice(0, 2)
      : sortedKeywords.slice(0, 3);

  const restCount = sortedKeywords.length - showKeywords.length;

  const capitalize = (word) =>
    word ? word.charAt(0).toUpperCase() + word.slice(1) : "";

  const firstFormatted = showKeywords.map(capitalize).join(", ");

  return (
    <div className="saved-news-header">
      <Header variant="saved" currentUser={currentUser} onLogout={onLogout} />

      <div className="saved-news-header__content">
        <h2 className="saved-news-header__title">Saved Articles</h2>
        <p className="saved-news-header__quantity">
          {currentUser
            ? `${currentUser.name}, you have ${count} ${count === 1 ? "saved article" : "saved articles"}`
            : `you have ${count} ${count === 1 ? "saved article" : "saved articles"}`}
        </p>
        <p className="saved-news-header__keyword">
          {sortedKeywords.length > 0 && (
            <>
              By keywords: {firstFormatted}
              {restCount > 0 &&
                ` , and ${restCount} ${restCount === 1 ? "other" : "others"}`}
            </>
          )}
        </p>
      </div>
    </div>
  );
}
