import logo from './logo.svg';
import axios from 'axios';
import './App.css';
import { useState, useEffect } from 'react';
//const API = require('./AnalyzerAPI.js');
import {analyzePortfolio} from './AnalyzerAPI';
const fetch = require('node-fetch');


//const axios = require('axios');

function StockIdentifier() {
  const [portfolioScoreText, setPortfolioScoreTextChange] = useState('-');
  const [squareColor, setSquareColor] = useState('gray');
  return (
    <div class = "background">
      <PortfolioScoreBar
      portfolioScoreText={portfolioScoreText}
      squareColor={squareColor}/>
      <InputStockBar
      portfolioScoreText={portfolioScoreText}
      setPortfolioScoreTextChange={setPortfolioScoreTextChange}
      setSquareColor={setSquareColor}/>
    </div>
  );
}

function PortfolioScoreBar({portfolioScoreText, squareColor}) {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div>
        <p id="TitleText" class="text">Portfolio Analyzer</p>
        <p id="ExplainText" class="text">Input your stocks. It will then output a Score of the whole stock protfolio</p>
      </div>
      <div class="square" style={{ backgroundColor: squareColor }}><p id="ScoreText" class="text">{portfolioScoreText}</p></div>
    </div>
  );
}

function InputStockBar({portfolioScoreText, setPortfolioScoreTextChange,setSquareColor}) {
  const [stockText, setStockTextChange] = useState('');
  const [dateText, setDateTextChange] = useState('');
  const [priceText, setPriceTextChange] = useState('');
  const [quantityText, setQuantityTextChange] = useState('');
  const [totalProfitText, setTotalProfitTextChange] = useState('0');
  const [StockList, setStockListChange] = useState([]);
  //const rows = [];
  // useEffect(() => {
  //   // This block will run after the component is rendered and the state is updated
  //   console.log('Updated portfolioScoreText:', portfolioScoreText);
  // }, [portfolioScoreText]); // useEffect will run whenever portfolioScoreText changes

  //OVERRIDE DELETE TO REMOVE ALL ELEMENTS FROM DATABASE 
  const handleSubmit = async (event) => {
    if(dateText === "KILL")
    {
      await fetch('http://localhost:8763/DelAllUH')
    .then(response => {
      // Check if the request was successful (status code in the range 200-299)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      // Parse the JSON in the response
      return response.json();
    })
    .then(data => {
      // Process the data
      console.log(data);
    })
    .catch(error => {
      console.error('Fetch error:', error.message);
    });
      return;
    } //end if

    const newStock = {name: stockText , date: dateText, price: priceText, amount: quantityText};
    setStockListChange([...StockList, newStock]);
    event.preventDefault();
    const dateText2 = encodeURIComponent(dateText).replace(/\//g, '%2F');
    await fetch('http://localhost:8763/InsertUH/' + stockText + '/' + dateText2 + '/' + priceText + '/' + quantityText)
    .then(response => {
      // Check if the request was successful (status code in the range 200-299)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      // Parse the JSON in the response
      return response.json();
    })
    .then(data => {
      // Process the data
      //setPortfolioScoreTextChange("hello");
    })
    .catch(error => {
      console.error('Fetch error:', error.message);
    });
    //console.log("hello");
    //let score = Math.floor(Math.random() * (100 - 0) + 0);
    let score = analyzePortfolio();
    if(parseInt(score, 10) > 70){
      setSquareColor('green');
    }else if(parseInt(score, 10) < 70 && parseInt(score, 10) > 50){
      setSquareColor('orange');
    }else{
      setSquareColor('red');
    }
    setPortfolioScoreTextChange(score/100);

    let num;
    await fetch('http://localhost:8763/getStock' + stockText)
    .then(response => {
      // Check if the request was successful (status code in the range 200-299)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      // Parse the JSON in the response
      return response.json();
    })
    .then(data => {
      num = data;
      console.log(data);
    })
    .catch(error => {
      console.error('Fetch error:', error.message);
    });
    num = analyzePortfolio();
    setTotalProfitTextChange(num);
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="formContainer">
        <div class="inputContainer">
          <input 
            type="text" 
            value={stockText} placeholder="Stock Name" 
            onChange={(e) => setStockTextChange(e.target.value)} />
        </div>
        <div class="inputContainer">
          <input 
            type="text" 
            value={dateText} placeholder="Date" 
            onChange={(e) => setDateTextChange(e.target.value)} />
        </div>
        <div class="inputContainer">
          <input 
            type="text" 
            value={priceText} placeholder="Price" 
            onChange={(e) => setPriceTextChange(e.target.value)} />
        </div>
        <div class="inputContainer">
          <input 
            type="text" 
            value={quantityText} placeholder="Quantity" 
            onChange={(e) => setQuantityTextChange(e.target.value)} />
        </div>
        <button type="submit" className="submit-button">
            Submit
        </button>
      </form>
      <div>
        <p id="ProfitText"class="text">Total Profit: ${totalProfitText}</p>
      </div>
      <table className="tableContainer">
        <thead>
          <tr>
            <th className="inputContainer">Name</th>
            <th className="inputContainer">Date</th>
            <th className="inputContainer">Price</th>
            <th className="inputContainer">Quantity</th>
          </tr>
        </thead>
        <tbody>
          {StockList.map((stock, index) => (
            <tr key={index}>
              <td className="inputContainer">{stock.name}</td>
              <td className="inputContainer">{stock.date}</td>
              <td className="inputContainer">{stock.price}</td>
              <td className="inputContainer">{stock.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


export default function App() {
  //return <FilterableProductTable products={PRODUCTS} />;
  return <StockIdentifier />;
}
