class MainApi {
  constructor() {
    this._baseUrl = import.meta.env.VITE_API_URL;
    this._headers = {
      "Content-Type": "application/json",
    };
  }

  _check(res) {
    if (!res.ok) {
      return res.json().then((err) => {
        throw new Error(err.message || "API error");
      });
    }

    return res.json();
  }

  register(email, password, name) {
    return fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ email, password, name }),
    }).then(this._check);
  }

  login(email, password) {
    return fetch(`${this._baseUrl}/signin`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ email, password }),
    }).then(this._check);
  }

  getMe() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        ...this._headers,
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then(this._check);
  }

  getSavedArticles() {
    return fetch(`${this._baseUrl}/articles`, {
      headers: {
        ...this._headers,
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then(this._check);
  }

  saveArticle(articleData) {
    return fetch(`${this._baseUrl}/articles`, {
      method: "POST",
      headers: {
        ...this._headers,
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(articleData),
    }).then(this._check);
  }

  deleteArticle(articleId) {
    return fetch(`${this._baseUrl}/articles/${articleId}`, {
      method: "DELETE",
      headers: {
        ...this._headers,
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then(this._check);
  }
}

export default new MainApi();
