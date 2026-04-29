import "./App.css";
import Main from "../Main/Main";
// import SavedNews from "../SavedNews/SavedNews";
import Footer from "../Footer/Footer";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="page">
      <Routes>
        <Route path="/" element={<Main />} />
        {/* <Route path="/saved-news" element={<SavedNews />} /> */}
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
