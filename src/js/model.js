import axios from "axios";
import { createQuery } from "./helpers.js";
import {
  BASIC_URL,
  COVER_URL,
  GOOGLE_SEARCH_URL,
  RES_PER_PAGE,
} from "./config.js";

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

export const loadSearchResults = async function (field, query) {
  try {
    //0) salva la query e prepara l'URL
    state.search.query = query;
    const apiUrl =
      field === "subjects"
        ? `subjects/${query}.json`
        : `search.json?${field}=${query}`;
    //1) aspetta la risposta della chiamata all'API
    const data = await axios.get(`${BASIC_URL}${apiUrl}`);
    let results;
    console.log(data.data);
    if (data.data.works) {
      results = data.data.works.map((w) => {
        return {
          id: w.key.slice(w.key.indexOf("OL")),
          title: w.title,
          author: w.authors[0].name,
          coverId: w.cover_id,
        };
      });
    } else if (data.data.docs) {
      results = data.data.docs.map((d) => {
        if (d.author_name) {
          return {
            id: d.key.slice(d.key.indexOf("OL")),
            title: d.title,
            author: d.author_name[0],
            coverId: d.cover_i,
          };
        } else if (!d.author_name && d.contributor) {
          return {
            id: d.key.slice(d.key.indexOf("OL")),
            title: d.title,
            author: d.contributor[0],
            coverId: "",
          };
        } else {
          return;
        }
      });
    }
    state.search.results = results.filter((r) => r);
    console.log(state.search.results);

    //2) Salva i dati arrivati tra i risultati creando l'oggetto libro che serve
    //3) Imposta la pagina iniziale a 1
  } catch (err) {
    console.error(err, "loading failed");
  }
};

const updateBookDescription = function (data) {
  if (!data.data.description) {
    state.book.description = `We're sorry, the description was not provided by Open Library.</br>If your're still curious, you can look for it on their website here at the bottom, or <a href="${GOOGLE_SEARCH_URL}${createQuery(
      state.book.title,
      state.book.author,
      "summary"
    )}" class="preview__link">google</a>it.`;
  } else if (typeof data.data.description === "object") {
    state.book.description = data.data.description.value;
  } else {
    state.book.description = data.data.description;
  }
};

export const loadBook = async function (id) {
  try {
    //0)Recupera il libro dalla ricerca
    state.book = state.search.results.filter((b) => b.id === id)[0];
    //1)aspetta la risposta alla chiamata all'API
    const data = await axios.get(`${BASIC_URL}works/${id}.json`);
    console.log(data);
    //2)salva i dati arrivati nell'oggetto libro
    state.book.cover = state.book.coverId
      ? `${COVER_URL}id/${state.book.coverId}-M.jpg`
      : `${COVER_URL}olid/${state.book.id}-M.jpg`;
    state.book.url = `${BASIC_URL}works/${state.book.id}`;
    updateBookDescription(data);
    console.log(state.book);
    //2)se il libro è salvato lo contrassegna
  } catch (err) {
    console.error(err, "book failed");
  }
};
export const saveBookmark = function () {};
export const addBookmark = function () {};
export const deleteBookmark = function () {};
