import "./NewsPage.css";
import NewsCardList from "../NewsCardList/NewsCardList";
import Preloader from "../Preloader/Preloader";
import NoResults from "../NoResults/NoResults";

export default function NewsPage({
  currentUser,
  articles,
  loading,
  error,
  searchDone,
  savedArticles,
  onSaveArticle,
  onDeleteArticle,
}) {
  if (!searchDone && !loading) return null;

  return (
    <div className="news-page">
      <div className="news-page__container">
        {loading && <Preloader />}

        {searchDone && !loading && error && (
          <p className="news-page__error">{error}</p>
        )}

        {searchDone && !loading && articles.length === 0 && <NoResults />}

        {searchDone && !loading && articles.length > 0 && (
          <>
            <h2 className="news-page__title">Procurar resultados</h2>
            <NewsCardList
              currentUser={currentUser}
              articles={articles}
              onSave={onSaveArticle}
              onRemove={onDeleteArticle}
              savedArticles={savedArticles}
            />
          </>
        )}
      </div>
    </div>
  );
}
