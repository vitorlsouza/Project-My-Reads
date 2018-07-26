import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Debounce } from 'react-throttle';
import * as api from '../BooksAPI';
import BookList from './BookList';

import gifLogo from '../gifs/loading.gif';

class SearchPage extends Component {
  state = {
    query: '',
    queryError: false,
    bookList: [],
    loading: false,
  }

  updateQuery = (query) => {
    this.setState({ query: query.trim() });
    this.queryBooks(query);
  }

  queryBooks = (query) => {
    this.setState({ loading: true, queryError: false });
    let queryResult = [];

    if (query) {
      api.search(query).then((results) => {
        if (results.error) {
          this.setState({ loading: false, queryError: true });
        }
        if (results.length > 0) {
          queryResult = results.map((result) => {
            return result;
          });
          this.setState({ bookList: queryResult, loading: false });
        } else {
          this.setState({ bookList: [] });
        }
      });
    } else {
      this.setState({ bookList: [] });
    }
  }

  render() {
    const {
      loading,
      query,
      bookList,
      queryError,
    } = this.state;

    const { handleChangeShelf, myBooks } = this.props;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author.
              So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <Debounce handler="onChange" time="400" >
              <input
                onChange={e => this.updateQuery(e.target.value)}
                placeholder="Search by title or author"
                type="text"
              />
            </Debounce>
          </div>
        </div>
        <div className="search-books-results">
          {queryError ? (
            <div className="gifLoading">
              <span className="no-books">Not found Books</span>
            </div>
          ) : false }
          {loading && query ? (
            <div className="gifLoading">
              <img
                alt="gif Loading"
                className="gif"
                src={gifLogo}
              />
            </div>
          ) : (
              bookList.length > 0 &&
                <ol className="books-grid">
                  {bookList.map(book => (
                    <BookList
                      key={book.id}
                      book={book}
                      myBooks={myBooks}
                      onChangeShelf={handleChangeShelf}
                    />
                  ))}
                </ol>
              )
          }
        </div>
      </div>
    );
  }
}

SearchPage.propTypes = {
  handleChangeShelf: PropTypes.func.isRequired,
  myBooks: PropTypes.arrayOf(PropTypes.shape({
    myBooks: PropTypes.array,
  })).isRequired,
};


export default SearchPage;
