var graph;

/**********/
class Holding
{
    constructor(name, weight)
    {
        this.name = name;
        this.weight = weight;
    }
}

/**********/
class Portfolio
{
    /**********/
    constructor(investment, holdings) 
    {
        this.investment = investment;

        this.holdings = holdings;

        //stats
        this.mdd = 0.0;
        this.std = 0.0;
        this.cagr = 0.0;
        this.positive = 0.0;
        this.returnsList = [];
        this.balancesList = [];
    }

    /**********/
    computeStats(start, end)
    {
        let years = jsonData["YEARS"];

        let _start = years.indexOf(start);
        let _end = years.indexOf(end);

        let balance = this.investment;

        let mdd = 0.0;
        let minBalance = this.investment;
        let maxBalance = this.investment;
        
        let returnsSum = 0.0;

        let positiveYears = 0;

        //for every year from start
        for (let i = _start; i <= _end; i++) 
        {
            let annualReturn = 0.0;

            //calculate sum for all assets in a single year
            for (let j = 0; j < this.holdings.length; j++) 
            {
                let holding = this.holdings[j];

                //get the return for the year
                let ret = parseFloat( jsonData[holding.name][i] ); 

                annualReturn += holding.weight / 100.0 * ret;    
            }

            //returns
            this.returnsList.push(annualReturn);
            returnsSum += annualReturn;
            
            //balances
            balance += balance / 100.0 * annualReturn;
            this.balancesList.push(balance);

            //mdd
            if(balance > maxBalance)
            {
                maxBalance = balance;
                minBalance = balance;
            }
            else if(balance < minBalance)
            {
                minBalance = balance;

                let _mdd = (minBalance - maxBalance) / maxBalance;
 
                if (_mdd < mdd) { mdd = _mdd; }
            }

            //years positive
            if(annualReturn>0){ positiveYears++; }

        }

        //compute interval (in years)
        let interval = _end - _start + 1;

        //adjust mdd
        this.mdd = mdd * 100.0;

        //calculate std
        let mean = returnsSum / interval;
        let stdSum = 0.0;
        for(let i=0; i<this.returnsList.length; i++)
        {
            stdSum += (this.returnsList[i] - mean) * (this.returnsList[i] - mean)
        }
        this.std = Math.sqrt(stdSum / interval);

        //compute cagr
        let cagr = ((balance / this.investment)**(1.0 / interval)) - 1;
        this.cagr = cagr * 100.0;
        
        //positive years %
        this.positive = positiveYears * 100 / interval;
    }
}

