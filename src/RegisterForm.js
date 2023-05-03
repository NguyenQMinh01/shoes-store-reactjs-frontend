import React, { useState } from "react";
import axios from "axios";
import bcrypt from "bcryptjs";


function RegisterForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (event) => {
    const passwordHash = await bcrypt.hash(password, 10);
    event.preventDefault();
    const data = {
      username: username,                   // Thêm trường 'username'
      email: email,
      password: passwordHash,
      password_confirmation: passwordConfirmation,
    };

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/users`, JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log(response);
      console.log("Đăng ký thành công!");
    } catch (error) {
      console.log(error.response);
      setError(error.response.data.message);
    }
  };



  return (
    <form onSubmit={handleRegister}>
      {error && <p>{error}</p>}
      <h2>Create an account</h2>
      <label>Username:</label>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      <label>Email:</label>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <br />
      <label>Password:</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <label>Confirm Password:</label>
      <input
        type="password"
        value={passwordConfirmation}
        onChange={(e) => setPasswordConfirmation(e.target.value)}
      />
      <br />
      <button type="submit">Register</button>
    </form>
  );
}

export default RegisterForm;
