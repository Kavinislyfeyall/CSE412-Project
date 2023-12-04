const express = require('express');
const { getMarketHistory, getStock, getUserHistory, InsertUserHistory, DelUserHistory } = require('../DBQueries/StockMarketQueries');
console.log( require('../DBQueries/StockMarketQueries'))



//Just a basic api endpoint I made
const app1 = express();


app1.get('/', (req, res) => {
  res.send('Api is working');
});


app1.get('/marketH', async (req, res) => {
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

app1.get('/getStock/:param1', async (req, res) => {
  //res.send('Api is working2');
  try {
    const abbrv1 = req.params.param1;
    //const date1 = req.params.param2;
    const abbrv = 'AAL'; //default
    const date = '2/7/18';
    
    const stock = await getStock(abbrv1, date);

    const dataArray = stock.map(record => Object.values(record));
    res.send(dataArray);
   // res.send('Api is working2');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app1.get('/getUH/', async (req, res) => {
  //res.send('Api is working2');
  try {
    //const abbrv = 'AAL'; //default
    //const date = '2/7/18';

 
    const stock = await getUserHistory() ;

    const dataArray = stock.map(record => Object.values(record));
    res.send(dataArray);
   // res.send('Api is working2');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app1.get('/InsertUH/:p1/:p2/:p3/:p4', async (req, res) => {
  //res.send('Api is working2');
  try {
    const abbv = 'AAL'; //default
    const date = '2/7/18';
    const price = '13.565';
    const volume = '64546';
   
    const abbv1 = req.params.p1;
    const date1 =  req.params.p2;
    const price1 = req.params.p3;
    const volume1 =  req.params.p4;

    const stock = await InsertUserHistory(abbv1, date1, price1, volume1) ;

    const dataArray = stock.map(record => Object.values(record));
    res.send(dataArray);
   // res.send('Api is working2');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app1.get('/DelUH/:p1/:p2', async (req, res) => {
  //res.send('Api is working2');
  try {
    const abbv = 'AAL'; //default
    const date = '2/7/18';

    const abbv1 = req.params.p1;
    const date1 =  req.params.p2;
    
    const ret = await DelUserHistory(abbv1, date1) ;

    const dataArray = ret.map(record => Object.values(record));
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