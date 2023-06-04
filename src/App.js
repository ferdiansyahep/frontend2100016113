import React, { useState } from 'react';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import BookForm from './components/BookForm';
import BookList from './components/BookList';
import { Container, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [showRegistration, setShowRegistration] = useState(false);
  const [registeredUsers, setRegisteredUsers] = useState([]);

  const handleLogin = (username, password) => {
    const user = registeredUsers.find((user) => user.username.value === username || user.password.value === password);

    if (user) {
      alert('Welcome');
      setLoggedIn(true);
    } else {
      alert('Username atau password salah');
      
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
  };

  const handleToggleRegistration = () => {
    setShowRegistration(!showRegistration);
  };

  const handleRegistration = (username, password) => {
    const userExists = registeredUsers.some((user) => user.username === username);

    if (userExists) {
      alert('Username sudah terdaftar!');
      return;
    }

    const newUser = { username, password };
    setRegisteredUsers([...registeredUsers, newUser]);
    alert('Pendaftaran berhasil!');
  };

  return (
    <Container className="mt-5">
      {loggedIn ? (
        <>
          <h1>Selamat datang!</h1>
          <Button variant="primary" onClick={handleLogout}>
            Logout
          </Button>
          <BookForm />
          <BookList />
        </>
      ) : (
        <>
          <LoginForm
            handleLogin={handleLogin}
            handleToggleRegistration={handleToggleRegistration}
            registeredUsers={registeredUsers}
          />
          {showRegistration && (
            <RegistrationForm
              handleRegistration={handleRegistration}
              handleToggleRegistration={handleToggleRegistration}
            />
          )}
        </>
      )}
    </Container>
  );
};

export default App;
