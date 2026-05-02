import { useState } from "react";
import "./App.css";
import Main from "../Main/Main";
import SavedNews from "../SavedNews/SavedNews";
import Footer from "../Footer/Footer";

import { Routes, Route } from "react-router-dom";

export default function App() {
  const [popup, setPopup] = useState(null);

  function handleOpenPopup(type) {
    setPopup({ type });
  }
  function handleClosePopup() {
    setPopup(null);
  }

  return (
    <div className="page">
      <Routes>
        <Route
          path="/"
          element={
            <Main
              popup={popup}
              onOpenPopup={handleOpenPopup}
              onClosePopup={handleClosePopup}
            />
          }
        />
        <Route path="/saved-news" element={<SavedNews />} />
      </Routes>

      <Footer />
    </div>
  );
}
