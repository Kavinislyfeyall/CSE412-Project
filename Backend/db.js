const {Postgre } = require('pg');


//Configuration to connect with groupDB

const postgre = new Postgre({
    user: 'abhinavkoyyalamudi',
    host: 'localhost',
    database: 'abhinavkoyyalamudi',
    port: 8888,
    // No password required if it's not set
  }); $USER


postgre.connect().then(() => console.log('Connected to GroupDatabase'))
.catch(err => console.error('Connection error', err));



// We can write sample query functions like this
async function getMarketHistory(limit = 20) {
    try {
      await client.connect();
      const result = await client.query('SELECT * FROM marketHistory limit ?', [limit]);
      return result.rows;
    } catch (error) {
      throw new Error('Error fetching users: ' + error.message);
    } finally {
      await client.end();
    }
  }
  
  // Export the functions
  module.exports = {
    getMarketHistory
  };