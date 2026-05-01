import "./SearchForm.css";

export default function SearchForm() {
  return (
    <form className="search-form">
      <input
        className="search-form__input"
        type="text"
        placeholder="Inserir tema"
      />
      <button className="search-form__search-button" type="submit">
        Procurar
      </button>
    </form>
  );
}
