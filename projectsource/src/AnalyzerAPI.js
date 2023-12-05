const fetch = require('node-fetch');
//const { getUserHistory, getStock} = require('../../Backend/API/app');

    var portfolioArray;
    async function getPortfolioInformation () {
        await fetch('http://localhost:8763/getUH').then(response => {
            return response.json();
        }).then(data => {
            this.portfolioArray = data;
            console.log(this.portfolioArray)
        })
    }
    async function analyzePortfolio() {
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
            var currentStock;
            await fetch('http://localhost:8763/getStock/' + stock[0]).then(response => {
                return response.json();
            }).then(data => {
                currentStock = data;
            })
            
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
            var currentStock;
            await fetch('http://localhost:8763/getStock/' + stock[0]).then(response => {
                return response.json();
            }).then(data => {
                currentStock = data;
            })
            
            var priceValued = currentStock[2];
            var value = volumn * priceValued;

            var stockRateOfReturn = value / expended - 1;
            var stockBeta = (stockRateOfReturn - riskFreeRate) / (marketRateOfReturn - riskFreeRate);
            var stockWeight = volumn / totalVolumn;
            betaOfPortfolio += stockBeta * stockWeight;
        }

        var treynorRatio = (portfolioReturn - riskFreeRate) / betaOfPortfolio;
        return treynorRatio;
    }
    


module.exports = {
    analyzePortfolio
};
