//this function  runs on open
function onOpen(){
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('RunCode') //this will create a menu from which you can run the program, you can change this name to whatever you like
  .addItem('Run Price Update','runUpdate') //the first variable can be change, DO NOT change the second variable as this is the name of the function below
  .addToUi();
  
  
}


//This function actually runs the update
function runUpdate(){
  var profitability = SpreadsheetApp.getActive().getSheetByName('Coins'); //looks for a sheet call 'Coins'
  profitability.activate(); //activate the sheet called 'Coins'
  var cell = profitability.getRange("c3"); //set the sell where the first price will appear, at cell c2, you need to have the coinmarketcap symbol for the coin you want price for
  updatePrices(cell, profitability);
  
}


//this function iterate through the symbol of coins/tokens you want price for a fetch it
 function updatePrices(cell2, profitability){
  row = cell2.getRow();
  col = cell2.getColumn();
  cell2.activate();
  var num =1;
  while(num!=0){    // this will iterate from cell2 (in our case c3, see above), and look at the cell to the left (c2) for the symbol and fetch the price, put it in c3 and move to c4.. until the cell on the left is blank
    symbol = profitability.getRange(row, col-1).getValue();
    if(symbol.length>0) fetchFromCoinMarketCap(cell2.getRow(), cell2.getColumn()-1);
    else{
      num=0;
      break;
    }
    row++;
  }
  
}
 


//the API url gets created here 
function fetchFromCoinMarketCap(row, column){
  var ss = SpreadsheetApp.getActiveSpreadsheet();
 var sheet = ss.getSheets()[0];
  var cell =sheet.getRange(row, column);  
  var url = 'http://coinmarketcap.northpole.ro/api/'+ cell.getValue()+'.json';
  var data = fetch(url);  
  
  var cell2 =sheet.getRange(row, column+1);
  cell2.setValue(data.price);
 
}

//the actual API call that returns the json object
function fetch(url){
  var text = UrlFetchApp.fetch(url).getContentText();
  return JSON.parse(text);
  
  
}

  
 
