import React, { useState } from 'react';
import { Form, Button, Card, Container } from 'react-bootstrap';

const RegistrationForm = ({ handleRegistration, handleToggleRegistration }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation for username and password
    if (username.trim() === '' || password.trim() === '') {
      alert('Please enter a username and password');
      return;
    }

    handleRegistration(username, password);
    setUsername('');
    setPassword('');
  };

  return (
    <Container className="d-flex justify-content-center align-items-center">
      <Card style={{ maxWidth: '400px' }}>
        <Card.Body>
          <h2 className="text-center mb-4">Registration</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formUsername">
              <Form.Label>Username:</Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <div className="d-grid">
              <Button variant="primary" type="submit" className="mt-3">
                Register
              </Button>
            </div>
          </Form>
          <div className="text-center mt-3">
            Already have an account?{' '}
            <Button variant="link" onClick={handleToggleRegistration}>
              Login
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default RegistrationForm;
