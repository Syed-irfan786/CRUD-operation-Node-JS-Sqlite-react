import React, { useState } from 'react';
import axios from 'axios';
import Loader from './loader';
function UserExist() {
  const [user, setUser] = useState('');
  const [user1, setUser1] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [data , setData] = useState([])
  const sleep1 =(ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const handleClick = async () => {
    setIsLoading(true);
    try {
      await sleep1(1000);
      const response = await  axios.get('http://localhost:8080/show-all-data');
      
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };


  


  const handleSubmit = (event) => {
    event.preventDefault();

    axios.post('http://localhost:8080/check-user', { user: user }, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => console.log(response.data)).catch(error => console.error(error));
  };

// Api call for modification of data in database
  const handleSubmitEdit = (event) =>{
    event.preventDefault();

    axios.post('http://localhost:8080/Edit-user', {name:name , email:email,},
    {
      headers:{
        'Content-Type':'application/json'
      }
    }).then(response=>console.log(response.data))
    .catch(error => console.error(error))

  }


  const handleSubmit1 = (event) => {
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

  const handleSubmit2 = (event) => {
    event.preventDefault();

    axios.post('http://localhost:8080/delete-user', {
      user: user1
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
    borderRadius: "5px",
    width: '500px',
    margin: "auto"
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
    <>
    
    <form onSubmit={handleSubmit1} style={formStyle}>
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
    <button type="submit" onClick={handleSubmit1} style={buttonStyle}>Add New User</button>
    <button type="submit" onClick={handleSubmitEdit} style={buttonStyle}>Update Username by Email</button>
    
  </form>
  <br/>

  <div style={{
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '50vh'
}}>
  <button type="submit" onClick={handleClick} style={buttonStyle}>Show All Data</button>
  {isLoading ? (
    <Loader/>
  ) : (
    <div >
      <p style={{display:'flex', flexDirection:'column' , justifyContent:'center'}}> User Name  ---------    Email Address</p>
      {data.map(item => (
        <p
          key={item.name}
          style={{
            backgroundColor: '#eee',
            padding: '10px',
            borderRadius: '5px',
            margin: '5px',
            fontSize: '18px',
            fontWeight: 'bold',
            color: '#333',
          }}
        >
          {item.name} -------  {item.email}
        </p>
      ))}
    </div>
  )}
</div>



  <hr/>
  <br/>

    <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <label htmlFor="user" style={{ marginBottom: '1rem', fontWeight: 'bold' }}>Get Email Address by Name:</label>
      <input type="text" id="user" value={user} onChange={(event) => setUser(event.target.value)} style={{ padding: '0.5rem', borderRadius: '0.5rem', border: 'none', boxShadow: '0 0.125rem 0.25rem rgba(0, 0, 0, 0.075)', marginBottom: '1rem', width: '20rem' }} />

      <button type="submit" onClick={handleSubmit} style={{ padding: '0.5rem 1rem', borderRadius: '0.5rem', border: 'none', boxShadow: '0 0.125rem 0.25rem rgba(0, 0, 0, 0.075)', backgroundColor: '#007bff', color: '#fff', cursor: 'pointer' }}>Get Email</button>
    </form>
    <br/>
  <hr/>
  <br/>

    <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <label htmlFor="user" style={{ marginBottom: '1rem', fontWeight: 'bold' }}>Deleted by Name:</label>
      <input type="text" id="user" value={user1} onChange={(event) => setUser1(event.target.value)} style={{ padding: '0.5rem', borderRadius: '0.5rem', border: 'none', boxShadow: '0 0.125rem 0.25rem rgba(0, 0, 0, 0.075)', marginBottom: '1rem', width: '20rem' }} />

      <button type="submit" onClick={handleSubmit2} style={{ padding: '0.5rem 1rem', borderRadius: '0.5rem', border: 'none', boxShadow: '0 0.125rem 0.25rem rgba(0, 0, 0, 0.075)', backgroundColor: '#007bff', color: '#fff', cursor: 'pointer' }}>Delete</button>
    </form>
   
    </>
  );
}

export default UserExist;
