import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/books', {
        params: { search },
      });
      setBooks(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/books/${id}`);
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    fetchData();
  };

  return (
    <div>
      <h2>Daftar Buku</h2>
      <form onSubmit={handleSearchSubmit} style={{ marginBottom: '20px' }}>
        <input type="text" value={search} onChange={handleSearchChange} placeholder="Cari buku..." />
        <button type="submit" style={{ marginLeft: '10px' }}>Cari</button>
      </form>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {books.length > 0 ? (
          books.map((book) => (
            <li key={book.id} style={{ marginBottom: '10px' }}>
              <div>
                <strong>ID:</strong> {book.id}
              </div>
              <div>
                <strong>Judul:</strong> {book.title}
              </div>
              <div>
                <strong>Penulis:</strong> {book.author}
              </div>
              <button onClick={() => handleDelete(book.id)} style={{ marginTop: '5px' }}>Hapus</button>
            </li>
          ))
        ) : (
          <li style={{ fontStyle: 'italic' }}>Tidak ada buku yang ditemukan</li>
        )}
      </ul>
    </div>
  );
};

export default BookList;
