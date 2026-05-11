class NewsApi {
  constructor({ baseUrl, apiKey }) {
    this._baseUrl = baseUrl;
    this._apiKey = apiKey;
  }

  async getEverything(query) {
    const fromDate = new Date();
    fromDate.setDate(fromDate.getDate() - 7);

    const toDate = new Date();

    const url = `${this._baseUrl}/everything?q=${encodeURIComponent(
      query,
    )}&from=${fromDate.toISOString()}&to=${toDate.toISOString()}&pageSize=100&apiKey=${
      this._apiKey
    }`;

    const res = await fetch(url);

    if (!res.ok) {
      throw new Error("API error");
    }

    return res.json();
  }
}

const newsApi = new NewsApi({
  baseUrl: "https://nomoreparties.co/news/v2",
  apiKey: "76c89edfc9cb49c1852a4e5ef6f07d2e",
});

export default newsApi;
