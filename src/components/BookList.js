import React, { useState, useEffect, useCallback } from 'react';
import { Form, Button, Card, ListGroup, Row, Col } from 'react-bootstrap';
import axios from 'axios';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState('');

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/books', {
        params: { search },
      });
      setBooks(response.data);
    } catch (error) {
      console.log(error);
    }
  }, [search]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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
    <Card>
      <Card.Body>
        <h2>Daftar Buku</h2>
        <Form onSubmit={handleSearchSubmit} className="mb-4">
          <Row className="align-items-center">
            <Col xs={12} md={9}>
              <Form.Control type="text" value={search} onChange={handleSearchChange} placeholder="Cari buku..." />
            </Col>
            <Col xs={12} md={3}>
              <Button type="submit" variant="primary" className="w-100">Cari</Button>
            </Col>
          </Row>
        </Form>
        {books.length > 0 ? (
          <ListGroup>
            {books.map((book) => (
              <ListGroup.Item key={book._id}>
                <Row className="align-items-center">
                  <Col xs={12} md={4}>
                    <strong>ID:</strong> {book._id}
                  </Col>
                  <Col xs={12} md={4}>
                    <strong>Judul:</strong> {book.title}
                  </Col>
                  <Col xs={12} md={3}>
                    <strong>Penulis:</strong> {book.author}
                  </Col>
                  <Col xs={12} md={1}>
                    <Button variant="danger" onClick={() => handleDelete(book._id)}>Hapus</Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        ) : (
          <p className="text-muted mt-3">Tidak ada buku yang ditemukan</p>
        )}
      </Card.Body>
    </Card>
  );
};

export default BookList;
