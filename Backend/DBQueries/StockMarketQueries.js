const {Client } = require('pg');


//Configuration to connect with groupDB

const dbClient  = new Client ({
    user: 'abhinavkoyyalamudi',
    host: 'localhost',
    database: 'abhinavkoyyalamudi',
    port: 8889,
    // Might have to add a password, dk if we have 1 set
  }); 


  //dbClient.connect().then(() => console.log('Connected to GroupDatabase'))
//.catch(err => console.error('Connection error', err));



// We can write sample query functions like this
async function getMarketHistory(limit = 20) {
    try {
      console.log('db client is running');
      await dbClient.connect();
      const result = await dbClient.query('SELECT * FROM marketHistory limit ' + limit);
      console.log(result.rows);
      return result.rows;
    } catch (error) {
      console.log(error.message);
      console.log('db client is not running');
      throw new Error('Error fetching users: ' + error.message);
    } finally {
      await dbClient.end();
    }
  }

  //Insert Into user history

  //Get all of user history table

  //Given abbv, return the price of the stock on date '2/7/2018'
  
  // Export the functions
  module.exports = {
    getMarketHistory
  };