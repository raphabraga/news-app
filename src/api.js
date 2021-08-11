const params = {
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};

const URL = "http://localhost:3000/api";

function getNews(subject) {
  return fetch(`${URL}/${subject}`, params)
    .then((response) => response.json())
    .catch((e) => console.error("Ocorreu um erro", e));
}

function getNewsById(subject, id) {
  return fetch(`${URL}/${subject}/${id}`, params)
    .then((response) => response.json())
    .catch((e) => console.error("Ocorreu um erro", e));
}

const api = { getNews, getNewsById };

export default api;
