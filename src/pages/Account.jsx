import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import './Account.css'
import Button from "../component/Button";
import BookCard from "../component/BookCard";
import Navbar from "../component/Navbar";

export default function Account() {
  const [user, setUser] = useState(null);
  const [books, setBooks] = useState([]);

  // For Add/Edit form
  const [editingBook, setEditingBook] = useState(null);
  const [formData, setFormData] = useState({ name: "", author: "", summary: "" ,imageUrl:""});

  const navigate = useNavigate();
  // const token = localStorage.getItem("token");
  const [token, setToken] = useState(() => localStorage.getItem("token"));


  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    // Fetch user info
    api.get("/users/me")
    .then(res => setUser(res.data))
    .catch(() => {
        localStorage.removeItem("token");
        setToken(null);
        navigate("/login");
      });

    // Fetch user's books
    fetchBooks();
  }, [token]);

  const fetchBooks = () => {
    api.get("/books/my")
       .then(res => setBooks(res.data))
       .catch(err => console.error(err));
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login", { replace: true });
  };

  const handleDeleteBook = (id) => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;
        api.delete(`/books/${id}`)
        .then(() => {
          setBooks(books.filter(book => book.id !== id));
        })
        .catch(() => alert("Failed to delete book"));
  };

    const startEditBook = (book) => {
      setEditingBook(book);
      setFormData({
        name: book.name || "",
        author: book.author || "",
        summary: book.summary || "",
        imageUrl: book.imageUrl || "",
        image: null
      });
    };


  const cancelEdit = () => {
    setEditingBook(null);
    setFormData({ name: "", author: "", summary: "" });
  };

  const handleInputChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  if (!formData.name || !formData.author) {
    alert("Name and author are required");
    return;
  }

  let imageUrl = formData.imageUrl;

  // If user selected a file, upload it first
  if (formData.image) {
    const imageData = new FormData();
    imageData.append("file", formData.image);

    try {
      const uploadRes = await api.post(
        "/books/upload",
        imageData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      imageUrl = uploadRes.data; // backend returns the URL
    } catch (err) {
      console.error(err);
      alert("Failed to upload image");
      return;
    }
  }

  // Now send the book details
  const bookData = {
    name: formData.name,
    author: formData.author,
    summary: formData.summary,
    imageUrl: imageUrl || "",
  };

  try {
    if (editingBook) {
      await api.put(
        `/books/${editingBook.id}`,
        bookData);
    } else {
      await api.post("/books", bookData);
    }
    fetchBooks();
    cancelEdit();
  } catch (err) {
    console.error(err);
    alert("Failed to save book");
  }
};

 return (
   <>
  {/* {navbar()} */}
  <Navbar />
  <div className="account-page">
    {/* LEFT SIDE */}
    <div className="user-info">
      <h2>Welcome, {user ? user.username : "User"}</h2>
      <Button onClick={handleLogout} name="Logout" type="button" />
      <hr />
      <h3>{editingBook ? "Edit Book" : "Add Book"}</h3>
      <form onSubmit={handleSubmit} className="book-form">
          {formData.imageUrl && (
            <div className="image-preview">
             <img
              src={`${import.meta.env.VITE_API_BASE_URL.replace('/api','')}${formData.imageUrl}`}
              alt="Book preview"
              className="preview-img"
            />
            </div>
          )}

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.files[0] }))}
          />

          <input
            type="text"
            name="name"
            placeholder="Book Name"
            value={formData.name}
            onChange={handleInputChange}
          />

          <input
            type="text"
            name="author"
            placeholder="Author"
            value={formData.author}
            onChange={handleInputChange}
          />

          <textarea
            name="summary"
            placeholder="Summary"
            value={formData.summary}
            onChange={handleInputChange}
          />

          <div className="form-buttons">
            <Button name={editingBook ? "Update" : "Add"} />
            {editingBook && (
              <Button
                type="button"
                onClick={cancelEdit}
                name="Cancel"
                className="cancel-btn"
              />
            )}
          </div>
        </form>

    </div>

    {/* RIGHT SIDE */}
   <div className="book-list">
  <h2 className="section-title">Your Books</h2>
  <div className="book-scroll-container">
    {books.map((book) => (
        <BookCard
          book={book}
          onDelete={handleDeleteBook}
          onEdit={() => startEditBook(book)} 
          showEditButton
          showDeleteButton
        />
      ))}
  </div>
</div>

  </div>
  </>
);

}



