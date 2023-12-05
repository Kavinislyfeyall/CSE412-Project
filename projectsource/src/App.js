import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
/*
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}


export default App;
*/
/*
function MyButton() {
  return (
    <button>
      I'm a button
    </button>
  );
}

export default function MyApp() {
  return (
    <div>
      <h1>Welcome to my app</h1>
      <MyButton />
    </div>
  );
}
*/
/*

function FilterableProductTable({ products }) {
  const [filterText, setFilterText] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);

  return (
    <div>
      <SearchBar 
        filterText={filterText} 
        inStockOnly={inStockOnly} 
        onFilterTextChange={setFilterText} 
        onInStockOnlyChange={setInStockOnly} />
      <ProductTable 
        products={products} 
        filterText={filterText}
        inStockOnly={inStockOnly} />
    </div>
  );
}

function ProductCategoryRow({ category }) {
  return (
    <tr>
      <th colSpan="2">
        {category}
      </th>
    </tr>
  );
}

function ProductRow({ product }) {
  const name = product.stocked ? product.name :
    <span style={{ color: 'red' }}>
      {product.name}
    </span>;

  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
}

function ProductTable({ products, filterText, inStockOnly }) {
  const rows = [];
  let lastCategory = null;

  products.forEach((product) => {
    if (
      product.name.toLowerCase().indexOf(
        filterText.toLowerCase()
      ) === -1
    ) {
      return;
    }
    if (inStockOnly && !product.stocked) {
      return;
    }
    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow
          category={product.category}
          key={product.category} />
      );
    }
    rows.push(
      <ProductRow
        product={product}
        key={product.name} />
    );
    lastCategory = product.category;
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function SearchBar({
  filterText,
  inStockOnly,
  onFilterTextChange,
  onInStockOnlyChange
}) {
  return (
    <form>
      <input 
        type="text" 
        value={filterText} placeholder="Search..." 
        onChange={(e) => onFilterTextChange(e.target.value)} />
      <label>
        <input 
          type="checkbox" 
          checked={inStockOnly} 
          onChange={(e) => onInStockOnlyChange(e.target.checked)} />
        {' '}
        Only show products in stock
      </label>
    </form>
  );
}

const PRODUCTS = [
  {category: "Fruits", price: "$1", stocked: true, name: "Apple"},
  {category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit"},
  {category: "Fruits", price: "$2", stocked: false, name: "Passionfruit"},
  {category: "Vegetables", price: "$2", stocked: true, name: "Spinach"},
  {category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin"},
  {category: "Vegetables", price: "$1", stocked: true, name: "Peas"}
];
*/

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
