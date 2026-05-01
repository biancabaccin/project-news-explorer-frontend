import "./SavedNewsHeader.css";
import Header from "../Header/Header";

export default function SavedNewsHeader() {
  return (
    <div className="saved-news-header">
      <Header variant="saved" />

      <div className="saved-news-header__content">
        <h2 className="saved-news-header__title">Artigos salvos</h2>
        <p className="saved-news-header__quantity">
          FULANA, você tem 5 artigos salvos
        </p>
        <p className="saved-news-header__keyword">
          Por palavras-chave: Natureza, Yellowstone, e 2 outras
        </p>
      </div>
    </div>
  );
}
