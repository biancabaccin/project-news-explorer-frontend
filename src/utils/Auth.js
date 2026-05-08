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
    }).then(this._check);
  }

  saveArticle(article) {
    return fetch(`${this._baseUrl}/articles`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(article),
    }).then(this._check);
  }

  deleteArticle(id) {
    return fetch(`${this._baseUrl}/articles/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._check);
  }
}

const authApi = new AuthApi({
  baseUrl: "https://nomoreparties.co/news",
  headers: {
    "Content-Type": "application/json",
  },
});

export default authApi;
