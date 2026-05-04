import { useState } from "react";
import "./NewsCardList.css";
import NewsCard from "../NewsCard/NewsCard";

export default function NewsCardList() {
  const sections = [
    [<NewsCard key="1-1" />, <NewsCard key="1-2" />, <NewsCard key="1-3" />],
    [<NewsCard key="2-1" />, <NewsCard key="2-2" />, <NewsCard key="2-3" />],
    [<NewsCard key="3-1" />, <NewsCard key="3-2" />, <NewsCard key="3-3" />],
  ];

  const [visibleSections, setVisibleSections] = useState(1);

  const handleShowMore = () => {
    setVisibleSections((prev) => Math.min(prev + 1, sections.length));
  };

  return (
    <>
      <ul className="news-card-list">
        {sections.slice(0, visibleSections).flat()}
      </ul>

      {visibleSections < sections.length && (
        <button
          className="news-card-list__more-button"
          type="button"
          onClick={handleShowMore}
        >
          Mostrar mais
        </button>
      )}
    </>
  );
}
