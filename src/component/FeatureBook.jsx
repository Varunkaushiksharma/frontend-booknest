import { useNavigate , Link } from "react-router-dom";
import './fb.css';
import BookCard from "./BookCard";
import Button from "./Button";

export default function FeaturedBooks({ books = [] }) {
  return (
    <section className="bookcontainer">
      <h2 className="section-heading">📚 Featured Books</h2>
      <div className="books">
        {books.length === 0 ? (
          <p>No books available.</p>
        ) : (
          books.map(book => <BookCard key={book.id} book={book} />)
        )}
       <Link to="/books"> <Button name="view all >>"/> </Link>
      </div>
    </section>
  );
}
