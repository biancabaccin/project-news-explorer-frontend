class AuthApi {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _check(res) {
    if (!res.ok) throw new Error("API error");
    return res.json();
  }

  getArticles() {
    return fetch(`${this._baseUrl}/articles`, {
      headers: this._headers,
    })
      .then((res) => this._check(res))
      .catch((err) => {
        console.error("Erro ao buscar artigos:", err);
        throw err;
      });
  }

  saveArticle(article) {
    return fetch(`${this._baseUrl}/articles`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(article),
    })
      .then((res) => this._check(res))
      .catch((err) => {
        console.error("Erro ao salvar artigo:", err);
        throw err;
      });
  }

  deleteArticle(id) {
    return fetch(`${this._baseUrl}/articles/${id}`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then((res) => this._check(res))
      .catch((err) => {
        console.error("Erro ao deletar artigo:", err);
        throw err;
      });
  }
}

const authApi = new AuthApi({
  baseUrl: "https://nomoreparties.co/news",
  headers: {
    "Content-Type": "application/json",
  },
});

export default authApi;
