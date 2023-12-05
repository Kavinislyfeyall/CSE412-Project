const axios = require('axios');
//const { getUserHistory, getStock} = require('../../Backend/API/app');

class AnalyzerAPI {
    portfolioArray;
    async getPortfolioInformation () {
        //take the array return value and set to portfolio array
        this.portfolioArray = await axios.get('http://localhost:8763/getUH').data;;
    }
    async analyzePortfolio() {
        //get protfolio return
        this.getPortfolioInformation();
        var totalExpendend = 0;
        var totalValue = 0;
        var totalVolumn = 0;
        for(var stock in this.portfolioArray) {
            var volumn = stock[3];
            totalVolumn += volumn;
            var pricePurchased = stock[2];
            totalExpendend += volumn * pricePurchased;
            //get current stocks most recent value (2/7/2018)
            var currentStock = await axios.get('http://localhost:8763/getStock/'+stock[0]).data;
            var priceValued = currentStock[2];
            totalValue += volumn * priceValued;
        }
        var portfolioReturn = totalValue / totalExpendend - 1;

        //get risk free rate
        var riskFreeRate = 0.0192;

        //get portfolio beta
        var marketRateOfReturn = 0.1013;
        var betaOfPortfolio;
        for(var stock in this.portfolioArray) {
            var volumn = stock[3];
            var pricePurchased = stock[2];
            var expended = volumn * pricePurchased;
            //get current stocks most recent value (2/7/2018)
            var currentStock = await axios.get('http://localhost:8763/getStock/'+stock[0]).data;
            var value = volumn * priceValued;
            
            var stockRateOfReturn = value / expended - 1;
            var stockBeta = (stockRateOfReturn - riskFreeRate) / (marketRateOfReturn - riskFreeRate);
            var stockWeight = volumn / totalVolumn;
            betaOfPortfolio += stockBeta * stockWeight;
        }

        var treynorRatio = (portfolioReturn - riskFreeRate) / betaOfPortfolio;
        return treynorRatio;
    }
    
}

module.exports = new AnalyzerAPI();