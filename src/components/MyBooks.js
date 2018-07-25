import React, { Component } from 'react';
import PropTypes from 'prop-types';
import OverlayLoader from 'react-overlay-loading/lib/OverlayLoader';
import StarRatingComponent from 'react-star-rating-component';
import Modal from 'react-awesome-modal';
import gifLogo from '../gifs/loading.gif';
import noImage from '../icons/no-image.jpg';
import ModalBook from './ModalBook';

import * as api from '../BooksAPI';

class MyBooks extends Component {
  state = {
    visible: false,
    currentBook: {},
  }

  getBook = (id) => {
    api.get(id).then((b) => {
      this.setState({ currentBook: b, visible: true });
    });
  }

  openModal = () => {
    this.setState({ visible: true });
  }

  handleCloseModal = () => {
    this.setState({ visible: false });
  }


  render() {
    const {
      books,
      shelf,
      title,
      loading,
      loadingBook,
      handleChangeShelf,
    } = this.props;

    const { visible, currentBook } = this.state;

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">
          {title}
        </h2>
        { loading ? (
          <div className="gifLoading">
            <img alt="gif Loading" className="gif" src={gifLogo} />
          </div>
        ) : (
          <div className="bookshelf-books">
            <ol className="books-grid">
              {books.filter(book => book.shelf === shelf)
                .map(book => (
                  <li key={book.id}>
                    <div className="book">
                      <div className="book-top">
                        <OverlayLoader
                          active={loadingBook}
                          backgroundColor="black"
                          color="#2e7d32"
                          loader="ScaleLoader"
                          opacity=".5"
                          text="Updating... Please wait!"
                        >
                          {book.imageLinks ? <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }} />
                          : <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${noImage})` }} />
                          }
                          <div className="book-shelf-changer">
                            <select
                              defaultValue={shelf}
                              onChange={e => handleChangeShelf(book, e.target.value)}
                            >
                              <option disabled value="none">
                                Move to...
                              </option>
                              <option value="currentlyReading">
                                Currently Reading
                              </option>
                              <option value="wantToRead">
                                Want to Read
                              </option>
                              <option value="read">
                                Read
                              </option>
                              <option value="none">
                                None
                              </option>
                            </select>
                          </div>
                        </OverlayLoader>
                      </div>
                      <div className="book-rating">
                        <StarRatingComponent
                          editing={false}
                          emptyStarColor="#ffb400"
                          name="rating"
                          starCount={book.averageRating}
                        />
                      </div>
                      <button onClick={() => this.getBook(book.id)} type="button">Details</button>
                      <div>
                        <Modal
                          effect="fadeInUp"
                          height="90%"
                          onClickAway={this.handleCloseModal}
                          visible={visible}
                          width="90%"
                        >
                          <ModalBook
                            currentBook={currentBook}
                            onCloseModal={this.handleCloseModal}
                          />
                        </Modal>
                      </div>
                      <div className="book-title">
                        {book.title}
                      </div>
                      {book.authors && book.authors.map(author => (
                        <div key={author} className="book-authors">{author}</div>
                      ))}
                    </div>
                  </li>
                ))}
            </ol>
          </div>
        )}
      </div>
    );
  }
}

MyBooks.propTypes = {
  books: PropTypes.arrayOf(PropTypes.shape({
    books: PropTypes.array,
  })).isRequired,
  handleChangeShelf: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  loadingBook: PropTypes.bool.isRequired,
  shelf: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default MyBooks;
