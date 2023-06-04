import React, { useState } from 'react';
import { Form, Button, Card, Row, Col } from 'react-bootstrap';
import axios from 'axios';

const BookForm = () => {
  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/api/books', {
        id,
        title,
        author,
      });
      console.log(response.data);
      setId('');
      setTitle('');
      setAuthor('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card>
      <Card.Body>
        <h2>Tambah Buku</h2>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6} lg={4}>
              <Form.Group controlId="formId">
                <Form.Label>ID:</Form.Label>
                <Form.Control type="text" value={id} onChange={(e) => setId(e.target.value)} />
              </Form.Group>
            </Col>
            <Col md={6} lg={4}>
              <Form.Group controlId="formTitle">
                <Form.Label>Judul:</Form.Label>
                <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
              </Form.Group>
            </Col>
            <Col md={6} lg={4}>
              <Form.Group controlId="formAuthor">
                <Form.Label>Penulis:</Form.Label>
                <Form.Control type="text" value={author} onChange={(e) => setAuthor(e.target.value)} />
              </Form.Group>
            </Col>
          </Row>
          <Button type="submit" variant="primary">Tambah</Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default BookForm;
