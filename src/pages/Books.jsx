import { useEffect, useState } from "react";
import Navbar from "../component/Navbar";
import api from "../api/axios";
import BookCard from "../component/BookCard";
import "./BookList.css";

export default function Books() {

    const [books, setBooks] = useState([]);
    const [name, setname] = useState("");

    // load all books initially
    useEffect(() => {
        api.get("/books")
            .then(res => setBooks(res.data))
            .catch(err => console.error(err));
    }, []);

    const fetchBooks = () => {

        const query = name.trim();

        if (!query) {
            api.get("/books")
                .then(res => setBooks(res.data))
                .catch(err => console.error(err));
            return;
        }

        api.get("/books/search", { params: { query } })
            .then(res => setBooks(res.data))
            .catch(err => console.error(err));
    };

    const onAddToLibrary = (bookId) => {
        api.post(`/library/add/${bookId}`)
            .then(() => alert("Book added to library!"))
            .catch(err => alert(err.response?.data));
    };

    return (
        <div>
            <Navbar />

            <section className="bookcontainer">
                <h2>All Books</h2>

                <div className="search-bar">

                    <input
                        className="search-input"
                        type="text"
                        value={name}
                        onChange={(e) => setname(e.target.value)}
                        placeholder="Search by name or author..."
                    />

                    <button onClick={fetchBooks}>
                        Search
                    </button>

                </div>

                <div className="books">

                    {books.length > 0 ? (
                        books.map((book) => (
                            <BookCard
                                key={book.id}
                                book={book}
                                onAddToLibrary={onAddToLibrary}
                                showAddButton={true}
                            />
                        ))
                    ) : (
                        <p>No books found</p>
                    )}

                </div>

            </section>
        </div>
    );
}