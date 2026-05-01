import "./NewsPage.css";
import NewsCardList from "../NewsCardList/NewsCardList";

export default function NewsPage() {
  return (
    <div className="news-page">
      <div className="news-page__container">
        <h2 className="news-page__title">Procurar resultados</h2>

        <NewsCardList />
      </div>
    </div>
  );
}
