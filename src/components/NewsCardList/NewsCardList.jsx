import React, { useState, useEffect } from "react";
import "./NewsCardList.css";
import NewsCard from "../NewsCard/NewsCard";

export default function NewsCardList({ currentUser }) {
  const cardsData = [
    {
      id: 1,
      title:
        "Todo mundo precisa de um 'Lugar Especial para Sentar' especial na natureza",
      description:
        "Desde que li o influente livro de Richard Louv, 'O Último Filho na Floresta', a ideia de ter um 'lugar para sentar' especial me pegou de jeito. Esse conselho, que Louv atribui ao educador da...",
      image:
        "https://ceagesp.gov.br/wp-content/uploads/2016/10/batataportal-600x469.jpg",
      date: "4 de novembro de 2020",
      source: "treehugger",
    },
    {
      id: 2,
      title: "A natureza faz de você uma pessoa melhor",
      description:
        "Todos nós sabemos como a natureza nos faz bem. Nós a conhecemos há milênios: o som dos oceanos, os aromas de uma floresta, a forma como a luz do sol dança através das folhas.",
      image:
        "https://cdn.wikifarmer.com/images/detailed/2020/11/Tudo-sobre-tomate-%E2%80%93-Fatos-interessantes-sobre-o-tomate.jpg",
      date: "19 de fevereiro de 2019",
      source: "national geographic",
    },
    {
      id: 3,
      title: "Fotos nostálgicas de turistas no parques nacionais dos EUA",
      description:
        "Uri Løvevild Golman e Helle Løvevild Golman são exploradores da National Geographic e fotógrafos de conservação que acabaram de concluir um projeto e livro que consideram uma...",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpRtu8FsQHibbZr3bqe2I-c-QcN07Fj8RW5w&s",
      date: "19 de outubro de 2020",
      source: "national geographic",
    },
    {
      id: 4,
      title: "Grand Teton renova a histórica Crest Trail",
      description:
        "A ligação entre as trilhas de Cascade e Death Canyon aconteceu em 1º de outubro de 1933, e marcou o primeiro passo na realização de um plano onde o viajante será...",
      image:
        "https://admin.cnnbrasil.com.br/wp-content/uploads/sites/12/2021/06/41613_D819FB928B268B0B.jpg?w=419&h=283&crop=0",
      date: "4 de novembro de 2020",
      source: "National parques traveler",
    },
  ];

  const [visibleCount, setVisibleCount] = useState(3);
  const [savedNews, setSavedNews] = useState({});

  useEffect(() => {
    if (currentUser?.email) {
      const saved = JSON.parse(localStorage.getItem("savedNewsByUser") || "{}");
      setSavedNews(saved[currentUser.email] || []);
    }
  }, [currentUser]);

  const handleSaveCard = (card) => {
    if (!currentUser?.email) return;

    const email = currentUser.email;
    const saved = JSON.parse(localStorage.getItem("savedNewsByUser") || "{}");
    if (!saved[email]) saved[email] = [];

    if (!saved[email].some((c) => c.id === card.id)) {
      saved[email].push(card);
      localStorage.setItem("savedNewsByUser", JSON.stringify(saved));
      setSavedNews(saved[email]);
    }
  };

  const handleRemoveCard = (cardId) => {
    if (!currentUser?.email) return;

    const email = currentUser.email;
    const saved = JSON.parse(localStorage.getItem("savedNewsByUser") || "{}");
    if (!saved[email]) return;

    saved[email] = saved[email].filter((c) => c.id !== cardId);
    localStorage.setItem("savedNewsByUser", JSON.stringify(saved));
    setSavedNews(saved[email]);
  };

  const handleShowMore = () => {
    setVisibleCount((prev) => Math.min(prev + 3, cardsData.length));
  };

  return (
    <>
      <ul className="news-card-list">
        {cardsData.slice(0, visibleCount).map((card) => (
          <NewsCard
            key={card.id}
            {...card}
            isLoggedIn={!!currentUser}
            isSavedNewsPage={false}
            onSave={() => handleSaveCard(card)}
            onRemove={() => handleRemoveCard(card.id)}
            savedNews={savedNews}
          />
        ))}
      </ul>

      {visibleCount < cardsData.length && (
        <button
          className="news-card-list__more-button"
          type="button"
          onClick={handleShowMore}
        >
          Mostrar mais
        </button>
      )}
    </>
  );
}
