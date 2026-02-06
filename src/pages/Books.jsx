import { useEffect, useState } from "react";
import Navbar from "../component/Navbar";
import api from "../api/axios";
import BookCard from "../component/BookCard";
import './BookList.css'

export default function Books(){

    const [books, setBooks] = useState([]);
    const[name,setname] = useState("")

    useEffect(() => {
        api.get("/books")
          .then((response) => setBooks(response.data))
          .catch((error) => console.error("error fetching books :", error));
    }, []);

    // Function to handle adding book to library
    const onAddToLibrary = (bookId) => {
        const token = localStorage.getItem("token");  // assuming JWT token
        api.post(`/library/add/${bookId}`)
        .then(() => alert("Book added to library!"))
        .catch(err => {
            const msg = err.response?.data || "Failed to add book to library";
            alert(msg);
        });
    };

    // render list of searched books
    const handleSearch = () => {
        const query = name.trim()
         if (!query) {
            api.get("/books")
                .then(res => setBooks(res.data))
                .catch(err => console.error(err));
            return;
        }

        api.get(`/books/search/${query}`)
        .then(response => {
            setBooks(response.data)
        }).catch(error => {
            console.error("error fetching books :", error)
        });
    }

    return (
        <div>
            <Navbar />
            <section className="bookcontainer">
                <h2>All Books</h2>
                <div className="search-bar">
           <input className="i"
                type="text"
                value={name}
                onChange={(e) => setname(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="Enter book name to search"
            />
            <button onClick={handleSearch} disabled={!name.trim()}>
            Search
            </button>

                </div>
                <div className="books">
                    {books.map((book) => (
                       <BookCard
                            key={book.id}
                            book={book}
                            onAddToLibrary={onAddToLibrary}
                            showAddButton={true}
                            />
                    ))}
                </div>
            </section>
        </div>
    )
}
