import NewsCard from "../NewsCard/NewsCard";

export default function NewsPage() {
  return (
    <>
      <div className="news-page">
        <div className="news-page__container">
          <h2 className="news-page__title">Procurar resultados</h2>

          <ul className="news-card__list">
            <NewsCard />
          </ul>

          <button className="news-page__more-button">Mostrar mais</button>
        </div>
      </div>
    </>
  );
}
