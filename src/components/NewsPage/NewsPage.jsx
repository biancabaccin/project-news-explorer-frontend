import "./NewsPage.css";
import NewsCardList from "../NewsCardList/NewsCardList";

export default function NewsPage({ currentUser }) {
  return (
    <div className="news-page">
      <div className="news-page__container">
        <h2 className="news-page__title">Procurar resultados</h2>

        <NewsCardList currentUser={currentUser} />
      </div>
    </div>
  );
}
