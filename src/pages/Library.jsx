import { useEffect, useState } from "react";
import api from "../api/axios"
import Navbar from "../component/Navbar";
import BookCard from "../component/BookCard";
import './Library.css';  // use this new CSS
import { useNavigate } from "react-router-dom";



export default function Library() {
  const navigate = useNavigate();
  const [libraryBooks, setLibraryBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchLibraryBooks = () => {
    const token = localStorage.getItem("token");
    api.get("/library/my")
    .then((res) => {
      const books = res.data.map((entry) => entry.book);
      setLibraryBooks(books);
      setLoading(false);
    })
    .catch((err) => {
      if(err.response && (err.response.status === 401 || err.response.status === 403)) {
        navigate("/login");
        return;
      }else{
      setError("Failed to load library");
      setLoading(false);
      }
    });
  };

  useEffect(() => {
    fetchLibraryBooks();
  }, []);

  const onRemoveFromLibrary = (bookId) => {
    const token = localStorage.getItem("token");
    api.delete(`/library/remove/${bookId}`)
    .then(() => {
      alert("Book removed from library");
      fetchLibraryBooks();
    })
    .catch(err => {
      alert(err.response?.data || "Failed to remove book");
    });
  };

  if (loading) return <p>Loading your library...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <Navbar />
      <section className="bookcontainer">
        <h2>Your Library</h2>
        {libraryBooks.length === 0 ? (
          <p>Your library is empty.</p>
        ) : (
          <div className="books">
            {libraryBooks.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                showRemoveButton={true}
                onRemoveFromLibrary={onRemoveFromLibrary}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
