/**********/
async function prepareView() 
{
    //add years list
    let years = jsonData["YEARS"];

    for (let i = 0; i < years.length; i++) 
    {
        let startOption = document.createElement("option");
        startOption.text = years[i];
        let startSelector = document.getElementById("start");
        startSelector.add(startOption);

        let endOption = document.createElement("option");
        endOption.text = years[i];
        let endSelector = document.getElementById("end");
        endSelector.add(endOption);
    }

    let startSelector = document.getElementById("start");
    startSelector.value = years[0];

    let endSelector = document.getElementById("end");
    endSelector.value = years[years.length-1];
    
    //add holding list
    for(let key in jsonData) 
    {
        if(key==="YEARS") { continue; }

        let option = document.createElement("option");
        option.text = key;
        
        let selector = document.getElementById("holding");
        selector.add(option);
    }

}

/**********/
function checkHolding(name)
{
    let table = document.getElementById("holdings");

    for(let i=1; i<table.rows.length; i++)
    {
        let row = table.rows[i];

        let n = row.cells[0].innerHTML;

        if(name === n) { return false; }
    }

    return true;
}

/**********/
function addHolding()
{
    let holding = document.getElementById("holding");
    
    if(!checkHolding(holding.value)){ alert("Holding already inserted"); return; }

    let table = document.getElementById("holdings");

    let row = table.insertRow(-1);
    
    //col0
    let cell0 = row.insertCell(0);
    cell0.className = "align-middle text-center";
    cell0.innerHTML = holding.value;

    //col1
    let weight = document.createElement("input");
    weight.type = "number";
    weight.className = "form-control text-center";
    weight.value = 0;
    weight.min = 0;
    weight.max = 100;
    weight.step = 5;
    
    let cell1 = row.insertCell(1);
    cell1.className = "align-middle text-center";
    cell1.appendChild(weight);

    //col2
    let btn = document.createElement("input");
    btn.type = "button";
    btn.className = "btn btn-primary btn-sm text-center";
    btn.value = "Remove";
    btn.onclick = function() { removeHolding(row); };

    let cell2 = row.insertCell(2);
    cell2.className = "align-middle text-center";
    cell2.appendChild(btn);
}

/**********/
function removeHolding(row)
{
    let table = document.getElementById("holdings");

    table.deleteRow(row.rowIndex);
}

/**********/
function retrieveHoldings(table)
{
    let holdings = [];

    for(let i=1; i<table.rows.length; i++)
    {
        let row = table.rows[i];

        let name = row.cells[0].innerHTML;

        let weight = parseFloat(row.cells[1].querySelector("input").value);

        holdings.push( new Holding(name, weight) );
    }

    return holdings;
}

/**********/
function validateHoldings(holdings)
{
    let limit = 100.0;

    for(let i=0; i<holdings.length; i++)
    {
        let weight = holdings[i].weight;

        if(weight<0.0){ return false; }

        limit -= weight;

        if(limit<0.0){ return false; }
    }

    return limit == 0.0;
}

/**********/
function clearTable(name)
{
    let table = document.getElementById(name);

    for (var i=table.rows.length-1; i>=1; i--) 
    {
        table.deleteRow(i);
    }
}

/**********/
function showElement(name)
{
    let element = document.getElementById(name);

    element.classList.remove("invisible");

    element.classList.add("visible");
}

/**********/
function displayStats(bh, pf)
{
    let table = document.getElementById("stats");

    let bhRow = table.insertRow(-1);

    bhRow.insertCell(0).innerHTML = "<b>Benchmark(60/40)</b>";
    bhRow.insertCell(1).innerHTML = bh.balancesList[pf.balancesList.length-1].toFixed(2).toLocaleString();
    bhRow.insertCell(2).innerHTML = bh.positive.toFixed(2).toLocaleString();
    bhRow.insertCell(3).innerHTML = bh.mdd.toFixed(2).toLocaleString();
    bhRow.insertCell(4).innerHTML = bh.std.toFixed(2).toLocaleString();
    bhRow.insertCell(5).innerHTML = bh.cagr.toFixed(2).toLocaleString();

    let pfRow = table.insertRow(-1);
    pfRow.insertCell(0).innerHTML = "<b>Portfolio</b>";
    pfRow.insertCell(1).innerHTML = pf.balancesList[pf.balancesList.length-1].toFixed(2).toLocaleString();
    pfRow.insertCell(2).innerHTML = pf.positive.toFixed(2).toLocaleString();
    pfRow.insertCell(3).innerHTML = pf.mdd.toFixed(2).toLocaleString();
    pfRow.insertCell(4).innerHTML = pf.std.toFixed(2).toLocaleString();
    pfRow.insertCell(5).innerHTML = pf.cagr.toFixed(2).toLocaleString();

    //higlight best results, if equals do not higlight
    if(bh.balancesList[pf.balancesList.length-1] > pf.balancesList[pf.balancesList.length-1]) 
    { bhRow.cells[1].classList.add("table-info"); }
    if(bh.balancesList[pf.balancesList.length-1] < pf.balancesList[pf.balancesList.length-1]) 
    { pfRow.cells[1].classList.add("table-info"); }

    if(bh.positive > pf.positive) { bhRow.cells[2].classList.add("table-info"); }
    if(bh.positive < pf.positive) { pfRow.cells[2].classList.add("table-info"); }

    if(bh.mdd > pf.mdd) { bhRow.cells[3].classList.add("table-info"); }
    if(bh.mdd < pf.mdd) { pfRow.cells[3].classList.add("table-info"); }

    if(bh.std < pf.std) { bhRow.cells[4].classList.add("table-info"); }
    if(bh.std > pf.std) { pfRow.cells[4].classList.add("table-info"); }

    if(bh.cagr > pf.cagr) { bhRow.cells[5].classList.add("table-info"); }
    if(bh.cagr < pf.cagr) { pfRow.cells[5].classList.add("table-info"); }

}

/**********/
function displayDetails(bh, pf, start, end)
{
    let table = document.getElementById("details");

    let years = jsonData["YEARS"];
    
    let labels = years.slice( years.indexOf(start), years.indexOf(end)+1 );

    for(let i=0; i<labels.length; i++)
    {
        let row = table.insertRow(-1);

        row.insertCell(0).innerHTML = labels[i];

        row.insertCell(1).innerHTML = bh.returnsList[i].toFixed(2).toLocaleString();
        row.insertCell(2).innerHTML = pf.returnsList[i].toFixed(2).toLocaleString();

        //higlight highest return, nothing if equals
        if(bh.returnsList[i] > pf.returnsList[i]) { row.cells[1].classList.add("table-info"); }
        if(bh.returnsList[i] < pf.returnsList[i]) { row.cells[2].classList.add("table-info"); }

        row.insertCell(3).innerHTML = bh.balancesList[i].toFixed(2).toLocaleString();
        row.insertCell(4).innerHTML = pf.balancesList[i].toFixed(2).toLocaleString();
    
        
    }
}

/**********/
function displayGraph(bh, pf, start, end)
{
    //generate year labels
    let years = jsonData["YEARS"];
    let labels = years.slice( years.indexOf(start), years.indexOf(end)+1 );

    //prepare datasets
    let datasets = [];
    datasets.push( { label : "Benchmark(60/40)", data: bh.balancesList } );
    datasets.push( { label : "Portfolio", data: pf.balancesList } );
    
    //destroy "graph" if needed
    if( window.graph !== undefined && window.graph !== null) 
    {
        window.graph.destroy();
    }

    //get canvas context
    const ctx = document.getElementById("graph");

    //generate graph
    window.graph = new Chart(ctx, 
    {
        type: 'line',

        data: 
        {
            labels: labels,
            datasets: datasets
        },

        options: 
        {
            tension : 0.25,
            scales: { y: { beginAtZero: false } }
        }
    });

}

/**********/
function generateReport()
{
    let start = parseInt( document.getElementById("start").value );

    let end = parseInt( document.getElementById("end").value );

    if(end-start<1) { alert("Invalid interval selected"); return; };

    let investment = parseFloat( document.getElementById("investment").value );

    let holdings = retrieveHoldings( document.getElementById("holdings") );

    if(holdings.length == 0) { alert("One or more holding required"); return; };

    if(!validateHoldings(holdings)) { alert("Weights allocation invalid"); return; };
    
    let pf = new Portfolio(investment, holdings);
    pf.computeStats(start, end);

    //create benchmark portfolio
    let _holdings = [];
    _holdings.push( new Holding("Large Cap Equity", 60));
    _holdings.push( new Holding("U.S. Fixed Income", 40));

    let bh = new Portfolio(investment, _holdings);
    bh.computeStats(start, end);

    showElement("stats-section");
    clearTable("stats");
    displayStats(bh, pf);

    showElement("details-section");
    clearTable("details");
    displayDetails(bh, pf, start, end);

    showElement("graph-section");
    displayGraph(bh, pf, start, end);
    
}
