import { useState } from "react";

import "./SearchForm.css";

export default function SearchForm({ onSearch }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!value.trim()) {
      setError("Por favor, insira uma palavra-chave");
      return;
    }

    setError("");
    onSearch(value);
  }

  function handleChange(e) {
    setValue(e.target.value);
    setError("");
  }

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        className="search-form__input"
        type="text"
        placeholder="Inserir tema"
        value={value}
        onChange={handleChange}
      />
      <button className="search-form__search-button" type="submit">
        Procurar
      </button>

      {error && <span className="search-form__error">{error}</span>}
    </form>
  );
}
