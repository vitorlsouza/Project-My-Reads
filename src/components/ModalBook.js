import React from 'react';
import StarRatingComponent from 'react-star-rating-component';
import PropTypes from 'prop-types';
import noImage from '../icons/no-image.jpg';

const ModalBook = (props) => {
  const { currentBook, onCloseModal } = props;
  return (
    <div className="book-container">
      <div className="book-details">
        <div className="book-details-title">
          <h3>
            Details
          </h3>
        </div>
        <div className="book-details-top">
          {currentBook.imageLinks ? <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${currentBook.imageLinks.thumbnail})` }} />
          : <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${noImage})` }} />
          }
        </div>
        <div className="book-details-rating">
          <StarRatingComponent
            editing={false}
            emptyStarColor="#ffb400"
            name="rating"
            starCount={currentBook.averageRating}
          />
        </div>
        <div className="book-details-subtitle">
          {currentBook.title}
        </div>
        {currentBook.authors && currentBook.authors.map(author => (
          <div key={author} className="book-details-authors">{author}</div>
        ))}
      </div>
      <div className="divisor" />
      <div className="book-description-content">
        <div className="book-details-description">
          <h3>
            Description
          </h3>
        </div>
        <div className="book-description">
          {currentBook.description ? currentBook.description : 'No description'}
        </div>
      </div>
      <div className="close-details">
        <a onClick={onCloseModal}>
          Close
        </a>
      </div>
    </div>
  );
};

ModalBook.propTypes = {
  currentBook: PropTypes.objectOf(PropTypes.shape({
    currentBook: PropTypes.object,
  })).isRequired,
  onCloseModal: PropTypes.func.isRequired,
};

export default ModalBook;
