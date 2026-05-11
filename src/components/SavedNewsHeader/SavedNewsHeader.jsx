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
  const uniqueKeywords = [...new Set(keywords)];

  const first = uniqueKeywords.slice(0, 2);
  const restCount = uniqueKeywords.length - first.length;

  const capitalize = (word) =>
    word ? word.charAt(0).toUpperCase() + word.slice(1) : "";

  const firstFormatted = first.map(capitalize).join(", ");

  return (
    <div className="saved-news-header">
      <Header variant="saved" currentUser={currentUser} onLogout={onLogout} />

      <div className="saved-news-header__content">
        <h2 className="saved-news-header__title">Artigos salvos</h2>
        <p className="saved-news-header__quantity">
          {currentUser
            ? `${currentUser.username}, você tem ${count} ${count === 1 ? "artigo salvo" : "artigos salvos"}`
            : `Você tem ${count} ${count === 1 ? "artigo salvo" : "artigos salvos"}`}
        </p>
        <p className="saved-news-header__keyword">
          {uniqueKeywords.length > 0 && (
            <>
              Por palavras-chave: {firstFormatted}
              {restCount > 0 &&
                ` , e ${restCount} ${restCount === 1 ? "outra" : "outras"}`}
            </>
          )}
        </p>
      </div>
    </div>
  );
}
