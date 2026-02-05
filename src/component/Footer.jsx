import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Book Nest</h3>
          <p>Your one-stop destination for all your reading needs.</p>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/books">Books</Link></li>
            <li><Link to="/account">Account</Link></li>
            <li><Link to="/library">Library</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contact Us</h4>
          <p>Email: support@booknest.com</p>
          <p>Phone: +91 12345 67890</p>
          <p>Address: Hapur, Uttar Pradesh, India</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 Book Nest. All rights reserved.</p>
      </div>
    </footer>
  );
}
