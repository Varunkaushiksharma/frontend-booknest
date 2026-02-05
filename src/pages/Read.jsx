import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import './Read.css'
import Navbar from "../component/Navbar";

export default function Read() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
  const token = localStorage.getItem("token");
  axios.get(`http://localhost:8080/api/books/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  .then(res => {
    setBook(res.data);
    setLoading(false);
  })
  .catch(err => {
    setError("Failed to fetch book");
    setLoading(false);
  });
}, [id]);


  if (loading) return <p>Loading book...</p>;
  if (error) return <p>{error}</p>;
  if (!book) return <p>Book not found.</p>;

  return (
    <> 
     <Navbar />
    <div className="read-book-container">
      <h1>{book.name}</h1>
      <h3>By: {book.author}</h3>
      <div className="book-content-scroll">

      <p>{book.summary}</p>
      </div>
      {/* If you have a book content or pdf link, show it here */}
      {/* e.g. <iframe src={book.pdfUrl} width="100%" height="600px" /> */}
    </div>
    </>
  );
}
