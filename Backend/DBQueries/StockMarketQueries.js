const {Client } = require('pg');


//Configuration to connect with groupDB




  //dbClient.connect().then(() => console.log('Connected to GroupDatabase'))
//.catch(err => console.error('Connection error', err));



// We can write sample query functions like this
async function getMarketHistory(limit = 20) {
  const dbClient  = new Client ({
    user: 'abhinavkoyyalamudi',
    host: 'localhost',
    database: 'abhinavkoyyalamudi',
    port: 8889,
    // Might have to add a password, dk if we have 1 set
  }); 

  

    try {
      console.log('db client is running');
      await dbClient.connect();
      const result = await dbClient.query('SELECT * FROM marketHistory limit ' + limit);
      console.log(result.rows);
      await dbClient.end();
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
  async function InsertUserHistory(abbv, date, price, volume) {
    const dbClient  = new Client ({
      user: 'abhinavkoyyalamudi',
      host: 'localhost',
      database: 'abhinavkoyyalamudi',
      port: 8889,
      // Might have to add a password, dk if we have 1 set
    }); 


    try {
      console.log('db client is running');
      await dbClient.connect();
      const result = await dbClient.query('insert into userHistory (u_abbv, u_date, u_price, u_volume) VALUES (\'' + abbv + '\',\''+ date + '\',\'' +  price + '\',\'' + volume + '\')');
      console.log(result.rows);
      await dbClient.end();
      return result.rows;
    } catch (error) {
      console.log(error.message);
      console.log('db client is not running');
      throw new Error('Error fetching users: ' + error.message);
    } finally {
      await dbClient.end();
    }
  }


   //Delete fro, user history
   async function DelUserHistory(abbv, date) {
    const dbClient  = new Client ({
      user: 'abhinavkoyyalamudi',
      host: 'localhost',
      database: 'abhinavkoyyalamudi',
      port: 8889,
      // Might have to add a password, dk if we have 1 set
    }); 


    try {
      console.log('db client is running');
      await dbClient.connect();
      const result = await dbClient.query('DELETE FROM userHistory where u_abbv = \'' + abbv + '\' AND u_date = \'' + date + '\'');
      console.log(result.rows);

      await dbClient.end();
      return result.rows;
    } catch (error) {
      console.log(error.message);
      console.log('db client is not running');
      await dbClient.end();
      throw new Error('Error fetching users: ' + error.message);
    } finally {
      await dbClient.end();
    }
  }
  
  //Delete All of  user history
   async function DelAllUserHistory(abbv, date) {
    const dbClient  = new Client ({
      user: 'abhinavkoyyalamudi',
      host: 'localhost',
      database: 'abhinavkoyyalamudi',
      port: 8889,
      // Might have to add a password, dk if we have 1 set
    }); 


    try {
      console.log('db client is running');
      await dbClient.connect();
      const result = await dbClient.query('DELETE FROM userHistory');
      console.log(result.rows);

      await dbClient.end();
      return result.rows;
    } catch (error) {
      console.log(error.message);
      console.log('db client is not running');
      await dbClient.end();
      throw new Error('Error fetching users: ' + error.message);
    } finally {
      await dbClient.end();
    }
  }
  
  

  //Get all of user history table
  async function getUserHistory() {
    const dbClient  = new Client ({
      user: 'abhinavkoyyalamudi',
      host: 'localhost',
      database: 'abhinavkoyyalamudi',
      port: 8889,
      // Might have to add a password, dk if we have 1 set
    }); 


    try {
      console.log('db client is running');
      await dbClient.connect();
      const result = await dbClient.query('SELECT * FROM userHistory');
      console.log(result.rows);
      await dbClient.end();
      return result.rows;
    } catch (error) {
      console.log(error.message);
      console.log('db client is not running');
      await dbClient.end();
      throw new Error('Error fetching users: ' + error.message);
    } finally {
      await dbClient.end();
    }
  }

  //Given abbv, return the price of the stock on date '2/7/2018'
  async function getStock(abrev, date1) {
    const dbClient  = new Client ({
      user: 'abhinavkoyyalamudi',
      host: 'localhost',
      database: 'abhinavkoyyalamudi',
      port: 8889,
      // Might have to add a password, dk if we have 1 set
    }); 


    try {
      console.log('db client is running');
      await dbClient.connect();
      const result = await dbClient.query('SELECT m_price, m_volume FROM marketHistory where m_abbv = \'' + abrev + '\' AND m_date = \'' + date1 + '\'');
      console.log(result.rows);
      await dbClient.end();
      return result.rows;
    } catch (error) {
      console.log(error.message);
      console.log('db client is not running');
      await dbClient.end();
      throw new Error('Error fetching users: ' + error.message);
    } finally {
      await dbClient.end();
    }
  }
  
  // Export the functions
  module.exports = {
    getMarketHistory,
    getUserHistory,
    getStock,
    InsertUserHistory,
    DelUserHistory,
    DelAllUserHistory
  };