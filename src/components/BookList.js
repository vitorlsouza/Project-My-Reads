import React from 'react';
import PropTypes from 'prop-types';
import StarRatingComponent from 'react-star-rating-component';
import noImage from '../icons/no-image.jpg';

const BookList = (props) => {
  const { book, onChangeShelf, myBooks } = props;
  let currentShelf = 'none';

  myBooks.filter((b) => {
    if (b.id === book.id) {
      currentShelf = b.shelf;
    }
    return currentShelf;
  });

  return (
    <li key={book.id}>
      <div className="book">
        <div className="book-top">
          {book.imageLinks ? <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }} />
          : <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${noImage})` }} />
          }
          <div className="book-shelf-changer">
            <select
              defaultValue={currentShelf}
              onChange={e => onChangeShelf(book, e.target.value)}
            >
              <option disabled value="none">Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-rating">
          <StarRatingComponent
            editing={false}
            emptyStarColor="#ffb400"
            name="rating"
            starCount={book.averageRating}
          />
        </div>
        <div className="book-title">{book.title}</div>
        {book.authors && book.authors.map(author => (
          <div key={author} className="book-authors">{author}</div>
        ))}
        {console.log(book.imageLinks)}
      </div>
    </li>
  );
};

BookList.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
  myBooks: PropTypes.arrayOf(PropTypes.shape({
    myBooks: PropTypes.array,
  })).isRequired,
  onChangeShelf: PropTypes.func.isRequired,
};

export default BookList;
