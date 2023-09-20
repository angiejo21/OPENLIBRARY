import axios from "axios";
import { API_URL, RES_PER_PAGE } from "./config.js";

/*-----------------------------------
              MODEL     
-----------------------------------*/

export const state = {
  book: {},
  search: {
    query: "",
    results: [],
    resultsPerPage: RES_PER_PAGE,
    page: 1,
  },
  bookmarks: [],
};

export const loadSearchResults = async function (query) {
  //0) salva la query
  state.search.query = query;
  //1) aspetta la risposta della chiamata all'API
  const data = await axios.get(`${API_URL}subjects/${query}.json`);
  console.log(data.data);
  state.search.results = data.data.works.map((work) => {
    return {
      id: work.key.slice(work.key.indexOf("OL")),
      title: work.title,
      author: work.authors[0].name,
      cover: work.cover_id,
    };
  });
  console.log(state.search.results);

  //2) Salva i dati arrivati tra i risultati creando l'oggetto libro che serve
  //3) Imposta la pagina iniziale a 1
};
export const loadBook = async function () {
  //0)aspetta la risposta alla chiamata all'API
  //1)salva i dati arrivati nell'oggetto libro
  //2)se il libro è salvato lo contrassegna
};
export const saveBookmark = function () {};
export const addBookmark = function () {};
export const deleteBookmark = function () {};
