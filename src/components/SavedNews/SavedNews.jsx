import { useNavigate } from "react-router-dom";
import "./SavedNews.css";

import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader";
import NewsCard from "../NewsCard/NewsCard";

export default function SavedNews({ currentUser, onLogout }) {
  const navigate = useNavigate();

  function handleLogoutClick() {
    onLogout();
    navigate("/");
  }

  return (
    <div className="saved-news">
      <SavedNewsHeader currentUser={currentUser} onLogout={handleLogoutClick} />

      <div className="saved-news__cards">
        <NewsCard />
        <NewsCard />
        <NewsCard />
      </div>
    </div>
  );
}
