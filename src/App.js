import React from 'react';
import { Link, Route } from 'react-router-dom';
import './App.css';
import * as api from './BooksAPI';

import MyBooks from './components/MyBooks';
import SearchPage from './components/SearchPage';

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    myBooks: [],
    loading: false,
    shelves: [
      { shelf: 'currentlyReading', title: 'Currently Reading' },
      { shelf: 'wantToRead', title: 'Want To Read' },
      { shelf: 'read', title: 'Read' },
    ],
    loadingBook: false,
  }

  componentDidMount() {
    this.setState({ loading: true });

    api.getAll().then(books => (
      this.setState({ myBooks: books, loading: false })
    ));
  }

  changeShelf = (book, shelf) => {
    this.setState({ loadingBook: true });
    let { myBooks } = this.state;
    api.update(book, shelf).then(() => {
      myBooks = myBooks.filter(b => b.id !== book.id).concat({
        ...book,
        shelf,
      });
      setTimeout(() => {
        this.setState({ myBooks, loadingBook: false });
      }, 1200);
    });
  }

  render() {
    const {
      shelves,
      myBooks,
      loading,
      loadingBook,
    } = this.state;

    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>
                  MyReads
                </h1>
              </div>
              <div className="list-books-content">
                {shelves.map(s => (
                  <MyBooks
                    key={s.title}
                    books={myBooks}
                    handleChangeShelf={this.changeShelf}
                    loading={loading}
                    loadingBook={loadingBook}
                    shelf={s.shelf}
                    title={s.title}
                  />
                ))}
              </div>
              <div className="open-search">
                <Link
                  to="/search"
                >
                  Add a book
                </Link>
              </div>
            </div>
          )}
        />
        <Route
          path="/search"
          render={() => (
            <SearchPage
              handleChangeShelf={this.changeShelf}
              myBooks={myBooks}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
