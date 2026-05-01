import "./SavedNews.css";
import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader";
import NewsCard from "../NewsCard/NewsCard";

export default function SavedNews() {
  return (
    <div className="saved-news">
      <SavedNewsHeader />

      <div className="saved-news__cards">
        <NewsCard />
        <NewsCard />
        <NewsCard />
      </div>
    </div>
  );
}
