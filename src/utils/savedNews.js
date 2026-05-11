export const getSavedCards = (userEmail) => {
  const saved = JSON.parse(localStorage.getItem("savedNewsByUser")) || {};
  return saved[userEmail] || [];
};

export const saveCardForUser = (userEmail, card) => {
  const saved = JSON.parse(localStorage.getItem("savedNewsByUser")) || {};
  if (!saved[userEmail]) saved[userEmail] = [];

  if (!saved[userEmail].some((c) => c.id === card.id)) {
    saved[userEmail].push(card);
    localStorage.setItem("savedNewsByUser", JSON.stringify(saved));
  }
};

export const removeCardForUser = (userEmail, cardId) => {
  const saved = JSON.parse(localStorage.getItem("savedNewsByUser")) || {};
  if (!saved[userEmail]) return;
  saved[userEmail] = saved[userEmail].filter((c) => c.id !== cardId);
  localStorage.setItem("savedNewsByUser", JSON.stringify(saved));
};
