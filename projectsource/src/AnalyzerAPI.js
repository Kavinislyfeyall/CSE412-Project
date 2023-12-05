const axios = require('axios');

class AnalyzerAPI {
    portfolioArray;
    constructor() {
        //take the array return value and set to portfolio array
    }
    async getPortfolioInformation () {
        //take the array return value and set to portfolio array
        this.portfolioArray = await axios.get('http://localhost:8763/getUH');
    }
    async analyzePortfolio() {
        //get protfolio return
        this.getPortfolioInformation();
        totalExpendend = 0;
        totalValue = 0;
        totalVolumn = 0;
        for(stock in this.portfolioArray) {
            volumn = stock[3];
            totalVolumn += volumn;
            pricePurchased = stock[2];
            totalExpendend += volumn * pricePurchased;
            //get current stocks most recent value (2/7/2018)
            currentStock = await axios.get('http://localhost:8763/getStock/'+stock[0])
            priceValued = currentStock[2];
            totalValue += volumn * priceValued;
        }
        portfolioReturn = totalValue / totalExpendend - 1;

        //get risk free rate
        riskFreeRate = 0.0192;

        //get portfolio beta
        marketRateOfReturn = 0.1013;
        betaOfPortfolio;
        for(stock in this.portfolioArray) {
            volumn = stock[3];
            pricePurchased = stock[2];
            expendend = volumn * pricePurchased;
            //get current stocks most recent value (2/7/2018)
            currentStock = await axios.get('http://localhost:8763/getStock/'+stock[0])
            priceValued = currentStock[2];
            value = volumn * priceValued;
            
            stockRateOfReturn = value / expended - 1;
            stockBeta = (stockRateOfReturn - riskFreeRate) / (marketRateOfReturn - riskFreeRate);
            stockWeight = volumn / totalVolumn;
            betaOfPortfolio += stockBeta * stockWeight;
        }

        treynorRatio = (portfolioReturn - riskFreeRate) / betaOfPortfolio;
        return treynorRatio;
    }
}