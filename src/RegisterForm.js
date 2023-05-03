import React, { useState } from "react";
import axios from "axios";

function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (event) => {
    event.preventDefault();

    const data = {
      user: {
        email: email,
        password: password,
        password_confirmation: passwordConfirmation,
      },
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/users",
        data
      );
      console.log(response);
      console.log("dk thanh cong");
    } catch (err) {
      setError(err.response.data.errors.join(", "));
    }
  };

  return (
    <form onSubmit={handleRegister}>
      {error && <p>{error}</p>}
      <h2>Create an account</h2>
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
