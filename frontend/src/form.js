import React, { useState } from 'react';
import axios from 'axios';

function MyForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');


  const handleSubmit = (event) => {
    event.preventDefault();

    axios.post('http://localhost:8080/post-data', {
      name: name,
      email: email,
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => console.log(response.data))
    .catch(error => console.error(error));
  };


  const formStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    border: "1px solid #ccc",
    padding: "20px",
    borderRadius: "5px"
  };

  const inputStyle = {
    padding: "10px",
    margin: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    width: "100%"
  };

  const buttonStyle = {
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "12px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px"
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        id="name"
        value={name}
        onChange={(event) => setName(event.target.value)}
        style={inputStyle}
      />
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        style={inputStyle}
      />
      <button type="submit" onClick={handleSubmit} style={buttonStyle}>Submit</button>
    </form>
  );
}

export default MyForm;
