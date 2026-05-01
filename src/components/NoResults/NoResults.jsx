import "./NoResults.css";
import notFound from "@src/images/Not_Found_v1.svg";

export default function NoResults() {
  return (
    <div className="no-results">
      <img className="no-results__image" src={notFound} alt="Not Found" />
      <p className="no-results__title">Nada encontrado</p>
      <p className="no-results__sub-title">
        Desculpe, mas nada corresponde aos seus termos de pesquisa.
      </p>
    </div>
  );
}
