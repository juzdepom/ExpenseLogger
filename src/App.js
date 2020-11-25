import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react';

function App() {
  const [data, setData] = useState({
    amount: '',
    category: '', 
    details: '',
  })

  const {amount, category, details} = data

  const handleChange = e => {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://v1.nocodeapi.com/fightnomadjulia/google_sheets/jWECsCeGQvPyGWAi?tabId=Sheet1', {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          }, 
          body: JSON.stringify([[amount, category, details, new Date().toLocaleString()]])
        }
      );
      await response.json()
      setData({ ...data, amount: "", category: "", details: ""})

    } catch(err){
        console.log(err)
      }
  };

  return (
    <div className="App">
      <div className="container">
        <form id="contact" onSubmit={handleSubmit}>
          <h3>Expense Logger</h3>
          <h4>Nov 28, 2020<br/> You have spent 65 baht so far today
          </h4>
            <label htmlFor="amount">Amount</label>
            <input 
              name="amount"
              placeholder="65" 
              type="number" 
              tabindex="1" 
              autoComplete="off"
              value={amount}
              onChange={handleChange}
              required autofocus/>
            <label htmlFor="category">Category</label>
            <input 
              name="category"
              placeholder="(Food, Misc)" 
              type="text" 
              tabindex="2" 
              autoComplete="off"
              value={category}
              onChange={handleChange}
              required/>
            <label htmlFor="details">Details</label>
            <input 
              name="details"
              placeholder="banana" 
              type="text" 
              tabindex="3" 
              autoComplete="off"
              value={details}
              onChange={handleChange}
              required/>
          <fieldset>
            <button name="submit" type="submit" id="contact-submit" data-submit="...Sending">Submit</button>
          </fieldset>
        </form>
      </div>
 
    </div>
  );
}

export default App;
