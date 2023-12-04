class AnalyzerAPI {
    portfolioArray;
    constructor() {
        //take the array return value and set to portfolio array
    }
    getPortfolioInformation () {
        //take the array return value and set to portfolio array
        return this.portfolioArray;
    }
    analyzePortfolio() {
        //get protfolio return
        totalExpendend = 0;
        totalValue = 0;
        totalVolumn = 0;
        for(stock in this.portfolioArray) {
            volumn = stock[3];
            totalVolumn += volumn;
            pricePurchased = stock[2];
            totalExpendend += volumn * pricePurchased;
            //get current stocks most recent value (2/7/2018)
            currentStock;
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
            currentStock;
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