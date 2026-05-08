import "./NewsBanner.css";
import newsBannerImage from "@src/images/News_Banner.png";

import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";

export default function NewsBanner({
  onOpenPopup,
  currentUser,
  onLogout,
  onSearch,
}) {
  return (
    <div className="news-banner">
      <Header
        onOpenPopup={onOpenPopup}
        currentUser={currentUser}
        onLogout={onLogout}
      />

      <img className="news-banner__photo" src={newsBannerImage} alt="Banner" />

      <div className="news-banner__container">
        <h1 className="news-banner__title">
          O que está{"\n"}acontecendo no mundo?
        </h1>

        <div className="news-banner-content">
          <p className="news-banner__description">
            Encontre as últimas notícias sobre qualquer tema e salve elas em sua
            conta pessoal
          </p>
          <SearchForm onSearch={onSearch} />
        </div>
      </div>
    </div>
  );
}
