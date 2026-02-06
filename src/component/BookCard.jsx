import React from "react";
import { Link } from "react-router-dom";
import "./BookCard.css";
import defaultImage from '../assets/dev.png';

export default function BookCard({
  book,
  onAddToLibrary,
  onRemoveFromLibrary,
  onEdit,
  onDelete,
  showAddButton = false,
  showRemoveButton = false,
  showEditButton = false,
  showDeleteButton = false
}) {
   // Build correct image URL
  const imageUrl = book.imageUrl
    ? `${import.meta.env.VITE_API_BASE_URL.replace('/api','')}${book.imageUrl}`
    : defaultImage;
  return (
    <div className="book-card">
   <img
      src={imageUrl}
      alt={book.name}
      onError={(e) => e.target.src = defaultImage}
    />
      {console.log("Book image URL:", book.imageUrl)}       
      <div className="book-info">
        <h3 className="book-name">{book.name}</h3>
        <p className="book-author">by {book.author}</p>
        <p className="book-summary">{book.summary}</p>

        <div className="button-group">
          <Link to={`/books/read/${book.id}`} className="read-more-link">
            Read More
          </Link>

          {showAddButton && (
            <button
              className="add-library-btn"
              onClick={() => onAddToLibrary(book.id)}
            >
              Add to Library
            </button>
          )}

          {showRemoveButton && (
            <button
              className="remove-library-btn"
              onClick={() => onRemoveFromLibrary(book.id)}
            >
              Remove from Library
            </button>
          )}

          {showEditButton && (
            <button
              className="edit-btn"
              onClick={() => onEdit(book.id)}
            >
              Edit
            </button>
          )}

          {showDeleteButton && (
            <button
              className="delete-btn"
              onClick={() => onDelete(book.id)}
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
