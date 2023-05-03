import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RegisterForm from './RegisterForm';

function LoginForm({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    axios
      .post('http://localhost:3000/login', { email, password })
      .then((response) => {
        if (response.data.success) {
          onLoginSuccess();
        } else {
          setError(response.data.message);
        }
      })
      .catch((error) => {
        setError('Failed to log in');
      });
  }

  function handleRegisterClick(event) {
    event.preventDefault();
    setShowRegisterForm(true);
  }

  const handleRegisterSuccess = () => {
    setShowRegisterForm(false);
  };

  return (
    <div>
      {showRegisterForm ? (
        <RegisterForm onRegisterSuccess={handleRegisterSuccess} />
      ) : (
        <form onSubmit={handleSubmit}>
          {error && <p>{error}</p>}
          <h2>Log In</h2>
          <label>Email:</label>
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
          <br />
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <br />
          <button type="submit">Log In</button>
          <button type="button" onClick={handleRegisterClick}>
            Register
          </button>
        </form>
      )}
    </div>
  );
}

function App() {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);


  useEffect(() => {
    axios
      .get('http://localhost:3000/products')
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function handleLoginSuccess() {
    setIsLoggedIn(true);
  }

  function handleSubmit(event) {
    event.preventDefault();
    axios
      .post('http://localhost:3000/orders', { email, phone })
      .then((response) => {
        alert('Order created!');
      })
      .catch((error) => {
        alert('Failed to create order');
      });
  }

  function handleLogout() {
    axios
      .delete('/logout')
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  if (!isLoggedIn) {
    return <LoginForm onLoginSuccess={handleLoginSuccess} />;
  }

  function handleRegisterSuccess() {
    setIsRegistered(true);
  }

  if (!isLoggedIn) {
    return (
      <div>
        {!isRegistered ? (
          <RegisterForm onRegisterSuccess={handleRegisterSuccess} />
        ) : (
          <LoginForm onLoginSuccess={handleLoginSuccess} />
        )}
      </div>
    );
  }

  return (
    <div>
      {user ? (
        <div>
          <p>Hello, {user.username}!</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <LoginForm />
      )}
      <h1>Welcome to the Shoe Store</h1>

      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} (${product.price})
          </li>
        ))}
      </ul>

      <form onSubmit={handleSubmit}>
        <h2>Place an Order</h2>
        <label>Email:</label>
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        <br />
        <label>Phone:</label>
        <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
        <br />
        <button type="submit">Place Order</button>
      </form>
    </div>
  );
}

export default App;
