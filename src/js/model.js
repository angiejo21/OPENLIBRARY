import axios from "axios";
import _ from "lodash-es";
import { BASIC_URL, COVER_URL, RES_PER_PAGE } from "./config.js";

/*-----------------------------------
              MODEL     
-----------------------------------*/
//STATE

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

//FUNCTIONS
//Creates the book objs for the results array (from the API response)
const createBookResults = function (data) {
  let results;
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
      } else {
        return;
      }
    });
  } else {
    return;
  }
  state.search.results = _.compact(results).map((r) => {
    _.find(state.bookmarks, { id: r.id })
      ? (r.bookmarked = true)
      : (r.bookmarked = false);
    return r;
  });
};

//Adds the description to the current book (from the API response)
const updateBookDescription = function (data) {
  if (!data.data.description) {
    state.book.description = `We're sorry, the description was not provided by Open Library. Although, if your're curious, you can check the book's page on their website:`;
  } else if (_.isObject(data.data.description)) {
    state.book.description = data.data.description.value;
  } else {
    state.book.description = data.data.description;
  }
};

//Saves the bookmarks in LocalStorage
const saveBookmark = function () {
  localStorage.setItem("bookmarks", JSON.stringify(state.bookmarks));
};

//EXPORTS
//Requests data to the API and fills the 'state' obj
export const loadSearchResults = async function (field, query) {
  try {
    //Creates url for API call
    const apiUrl =
      field === "subjects"
        ? `subjects/${query}.json`
        : `search.json?${field}=${query}`;
    //Loads response data
    const data = await axios.get(`${BASIC_URL}${apiUrl}`);
    //Saves data in the 'state' obj
    state.search.query = query.replaceAll("+", " ");
    createBookResults(data);
    //Resets page
    state.search.page = 1;
  } catch (err) {
    throw new Error("Network error, please try again!");
  }
};

//Requests data to the API and completes the 'current book' obj
export const loadBook = async function (bookId) {
  try {
    //Finds the selected id and saves it as 'current book'
    state.book = _.find(state.search.results, { id: bookId });
    //Loads response data
    const data = await axios.get(`${BASIC_URL}works/${bookId}.json`);
    //Completes the 'current book' obj with cover, url & description
    state.book.cover = state.book.coverId
      ? `${COVER_URL}id/${state.book.coverId}-M.jpg`
      : `https://picsum.photos/250/400`;
    state.book.url = `${BASIC_URL}works/${state.book.id}`;
    updateBookDescription(data);
  } catch (err) {
    throw new Error("Book loading failed, please try again!");
  }
};

//Returns the search results for the selected page
export const getPageResults = function (moveTo = state.search.page) {
  if (moveTo === "previous") state.search.page--;
  if (moveTo === "next") state.search.page++;
  const page = state.search.page;
  const start = (page - 1) * RES_PER_PAGE;
  const end = page * RES_PER_PAGE;
  return state.search.results.slice(start, end);
};

//Bookmarks
//Adds bookmark from book
export const addBookmark = function (book) {
  book.bookmarked = true;
  state.bookmarks.push(book);
  saveBookmark();
};
//Deletes bookmark from book
export const deleteBookmark = function (book) {
  _.pull(state.bookmarks, _.find(state.bookmarks, { id: book.id }));
  book.bookmarked = false;
  saveBookmark();
};
//Copies the saved bookmarks as search results (for rendering)
export const showBookmarks = function () {
  state.search.results = _.cloneDeep(state.bookmarks);
};
//Recollects saved bookmarks from LocalStorage
export const initStorage = function () {
  const storage = localStorage.getItem("bookmarks");
  if (storage) state.bookmarks = JSON.parse(storage);
};
