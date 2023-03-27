import React, { useState } from 'react';
import axios from 'axios';

function MyForm() {
  const [itemName, setItemName] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [itemStatus, setItemStatus] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.post('http://127.0.0.1:8080/post-data', {
      item_name: itemName,
      item_price: itemPrice,
      item_status: itemStatus
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => console.log(response.data))
    .catch(error => console.error(error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Item Name:
        <input type="text" value={itemName} onChange={(e) => setItemName(e.target.value)} />
      </label>
      <br />
      <label>
        Item Price:
        <input type="number" value={itemPrice} onChange={(e) => setItemPrice(e.target.value)} />
      </label>
      <br />
      <label>
        Item Status:
        <input type="number" value={itemStatus} onChange={(e) => setItemStatus(e.target.value)} />
      </label>
      <br />
      <button onClick={handleSubmit}>Submit</button>
    </form>
  );
}

export default MyForm;