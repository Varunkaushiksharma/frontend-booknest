import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import FeaturedBooks from "./FeatureBook";
import { useNavigate } from "react-router-dom";
import './HeroSection.css'

export default function HeroSection() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/home")
      .then(res => setBooks(res.data))
      .catch(err => console.error(err));
  }, []);

  // Then pass books to FeaturedBooks component or render directly
  return (
    <>
      {/* Hero part */}
      <div className="hero-container">
        <section className="hero-content">
          <h1>Welcome to <span className="brand-name">Book Nest</span></h1>
          <p>Your one-stop destination for all your reading needs.</p>
          <Link to="/books" className="explore-btn">Explore Books</Link>
        </section>
      </div>

      {/* Featured Books */}
      <FeaturedBooks books={books} />
    </>
  );
}
