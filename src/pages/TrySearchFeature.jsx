import api from "../api/axios"
import { useState , useEffect } from "react"
import React from "react"
import BookCard from "../component/BookCard"
import Button from "../component/Button"


export default function TrySearchFeature() {
    const[name,setname] = useState("")
    const[books,setbooks] = useState([])

    const handleSearch = () => {
        api.get(`/books/search/${name}`)
        .then(response => {
            setbooks(response.data)
        }).catch(error => {
            console.error("error fetching books :", error)
        });
    }



    return (
        <>
        <div>
            <input type="text" value={name} onChange={(e)=>setname(e.target.value)} placeholder="Enter book name to search" />
            <Button onClick={handleSearch}>Search</Button>
        </div>

        <div className="book-list">
            {books.length > 0 ? (
                books.map((book) => (
                    <BookCard key={book.id} book={book} />
                ))
            ) : (
                <p>No books found</p>
            )}
        </div>

        </>
    )


}