import "./NewsCard.css";
import SaveTooltip from "./components/SaveTooltip/SaveTooltip";
import RemoveTooltip from "./components/RemoveTooltip/RemoveTooltip";

export default function NewsCard() {
  return (
    <>
      <li className="news-card">
        <img
          className="news-card__image"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVrT1koIwpFcxwtbGdXHr_C7o60pvljf6Tow&s"
          alt="Article Image"
        />

        {/* <SaveTooltip /> */}
        {/* <button
          className="news-card__save-button"
          aria-label="Save News"
          type="button"
        ></button> */}

        <RemoveTooltip />
        <div className="news-card__top-box">
          <p className="news-card__article-tag">ArticleTag</p>

          <button
            className="news-card__remove-button"
            aria-label="Remove News"
            type="button"
          ></button>
        </div>

        <div className="news-card__content">
          <p className="news-card__date">4 de novembro de 2020</p>
          <p className="news-card__title">
            Todo mundo precisa de um ''Lugar Especial para Sentar" especial na
            naturezaza
          </p>
          <p className="news-card__description">
            "A ligação entre as trilhas de Cascade e Death Canyon aconteceu em
            1º de outubro de 1933, e marcou o primeiro passo na realização de um
            plano onde o viaasdasdasdasddjante ASDASD será.. sdSDASD.
          </p>
          <p className="news-card__source">treehugger</p>
        </div>
      </li>
    </>
  );
}
