const express = require('express');
const { getMarketHistory } = require('../DBQueries/StockMarketQueries');
console.log( require('../DBQueries/StockMarketQueries'))



//Just a basic api endpoint I made
const app1 = express();

/*
app.get('/', (req, res) => {
  res.send('Api is working');
});

*/
app1.get('/', async (req, res) => {
  //res.send('Api is working2');
  try {
    const limit = 20; //default limit
    const marketHistory = await getMarketHistory(limit);

    const dataArray = marketHistory.map(record => Object.values(record));
    res.send(dataArray);
   // res.send('Api is working2');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start the server
const port = process.env.PORT || 8763; // Use the port specified in environment variables or default to 3000
app1.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});