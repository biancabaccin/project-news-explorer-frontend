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
          What's happening{"\n"}in the world?
        </h1>

        <div className="news-banner-content">
          <p className="news-banner__description">
            Find the latest news on any topic and save them to your personal
            account
          </p>
          <SearchForm onSearch={onSearch} />
        </div>
      </div>
    </div>
  );
}
