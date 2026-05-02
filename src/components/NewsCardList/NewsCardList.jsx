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

      {/* verificar se o type desse botão é button ou submit */}
      <button className="news-card-list__more-button">Mostrar mais</button>
    </>
  );
}
