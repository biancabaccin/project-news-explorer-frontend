import "./NewsCardList.css";
import NewsCard from "../NewsCard/NewsCard";

export default function NewsCardList() {
  return (
    <>
      <ul className="news-card-list">
        <NewsCard />
        <NewsCard />
        <NewsCard />
      </ul>

      <button className="news-card-list__more-button">Mostrar mais</button>
    </>
  );
}
