import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState('');
  const [releaseYear, setReleaseYear] = useState(0);
  const [editTitle, setEditTitle] = useState('');

  useEffect(() => {
    async function fetchBooks() {
      try{
        const response = await fetch('http://localhost:8000/api/books/');
        const data = await response.json();
        setBooks(data)
        console.log(data)
      }catch(err){
        console.log(err)
      }
    }
    fetchBooks()

  }, [])

  const addBook = async () => {
    const bookData = {
      title,
      release_year: releaseYear
    }
    try {

      const response = await fetch('http://localhost:8000/api/books/create', {
        method: "POST",
        headers: {
          'Content-Type': "application/json"
        },
        body: JSON.stringify(bookData)
      })
      const data = await response.json();
      setBooks((prev) => [...prev, data])
    }catch(err) {
      console.log(err)
    }
  }

  const updateTitle = async (pk, release_year) => {
    const bookData = {
      title: editTitle,
      release_year: release_year,
    }
    try {

      const response = await fetch(`http://localhost:8000/api/books/${pk}`, {
        method: "PUT",
        headers: {
          'Content-Type': "application/json"
        },
        body: JSON.stringify(bookData)
      })
      const data = await response.json();
      // This is how specific updation achieved from states
      setBooks((prev) => prev.map((book) => {
        if (book.id == pk) {
          return data
        } else {
          return book
        }
      }))
    }catch(err) {
      console.log(err)
    }
  }

  const deleteBook = async (pk) => {
     try {
      const response = await fetch(`http://localhost:8000/api/books/${pk}`, {
        method: "DELETE",
      })
      // This is how exclude deleted data from usestate
      setBooks((prev) => prev.filter((book) => book.id !== pk))
    }catch(err) {
      console.log(err)
    }
  }

  return (
    <>
    <h1> Book Website</h1>
    <div>
      <input
      type='text'
      placeholder='Book Title...'
      onChange={(ev) => setTitle(ev.target.value)}
      />
      <input
      type='number'
      placeholder='Release Date...'
      onChange={(ev) => setReleaseYear(ev.target.value)}/>
      <button onClick={addBook}>Add Book</button>
    </div>
    {books && books.map((book,ind) => {
      return <div key={ind}>
        <p>Title: {book.title}</p>
        <p>Release Year: {book.release_year}</p>
        <input type="text" placeholder='New Title...'
        onChange={(e) => setEditTitle(e.target.value)}/>
        <button onClick={() => updateTitle(book.id, book.release_year)}>Change Title</button>
        <button onClick={() => deleteBook(book.id)}>Delete</button>
        <hr />
      </div>
    })}
    </>
  )
}

export default App
