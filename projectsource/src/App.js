import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';

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
  const [totalProfitText, setTotalProfitTextChange] = useState('');
  const [StockList, setStockListChange] = useState([]);
  //const rows = [];
  // useEffect(() => {
  //   // This block will run after the component is rendered and the state is updated
  //   console.log('Updated portfolioScoreText:', portfolioScoreText);
  // }, [portfolioScoreText]); // useEffect will run whenever portfolioScoreText changes

  const handleSubmit = (event) => {
    const newStock = {name: stockText , date: dateText, price: priceText, amount: quantityText};
    setStockListChange([...StockList, newStock]);
    event.preventDefault();
    const score = Math.floor(Math.random() * 100) + 1;
    setPortfolioScoreTextChange(score);
    if(parseInt(score, 10) > 70){
      setSquareColor('green');
    }else if(parseInt(score, 10) < 70 && parseInt(score, 10) > 50){
      setSquareColor('orange');
    }else{
      setSquareColor('red');
    }
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
        <p id="ProfitText"class="text">Total Profit: {totalProfitText}</p>
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
