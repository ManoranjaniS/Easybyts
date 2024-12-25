// Define the stocks and portfolio
const stocks = [
  { symbol: 'AAPL', name: 'Apple Inc.', price: 145.09 },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 2734.17 },
  { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 3341.95 },
  { symbol: 'TSLA', name: 'Tesla Inc.', price: 694.91 },
  { symbol: 'MSFT', name: 'Microsoft Corporation', price: 289.67 },
  { symbol: 'NFLX', name: 'Netflix Inc.', price: 393.68 }
];

let portfolio = {};
const alerts = [];
let transactionHistory = [];

// Fetch Stock Prices
async function fetchStockPrices(symbol) {
  const API_URL = 'https://www.alphavantage.co/query';
  const API_KEY = 'your_api_key';  // Replace with actual API key
  try {
    const response = await fetch(`${API_URL}?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${API_KEY}`);
    const data = await response.json();
    if (data['Time Series (5min)']) {
      const latestData = data['Time Series (5min)'][Object.keys(data['Time Series (5min)'])[0]];
      return parseFloat(latestData['4. close']);
    }
    throw new Error('Unable to fetch stock data');
  } catch (error) {
    console.error('Error fetching stock data:', error);
    return null;
  }
}

// Display stock information
function displayStocks() {
  const stockList = document.getElementById('stock-list');
  stockList.innerHTML = '';
  stocks.forEach(stock => {
    const stockItem = document.createElement('div');
    stockItem.innerHTML = `
      <h3>${stock.name} (${stock.symbol})</h3>
      <p>Price: $${stock.price}</p>
      <button class="button" onclick="buyStock('${stock.symbol}', ${stock.price})">Buy</button>
    `;
    stockList.appendChild(stockItem);
  });
}

// Buy stock function
function buyStock(symbol, price) {
  const quantity = prompt(`How many shares of ${symbol} do you want to buy?`);
  if (quantity && !isNaN(quantity) && quantity > 0) {
    if (!portfolio[symbol]) {
      portfolio[symbol] = { price, quantity: 0 };
    }
    portfolio[symbol].quantity += parseInt(quantity);
    recordTransaction(symbol, 'Buy', quantity, price);
    alert(`You bought ${quantity} shares of ${symbol} for $${(price * quantity).toFixed(2)}`);
    updatePortfolio();
  } else {
    alert('Invalid quantity');
  }
}

// Sell stock function
function sellStock(symbol) {
  const quantity = prompt(`How many shares of ${symbol} do you want to sell?`);
  if (quantity && !isNaN(quantity) && quantity > 0) {
    if (portfolio[symbol] && portfolio[symbol].quantity >= quantity) {
      portfolio[symbol].quantity -= parseInt(quantity);
      if (portfolio[symbol].quantity === 0) {
        delete portfolio[symbol];
      }
      recordTransaction(symbol, 'Sell', quantity, portfolio[symbol].price);
      alert(`You sold ${quantity} shares of ${symbol}`);
      updatePortfolio();
    } else {
      alert(`You don't have enough shares of ${symbol}`);
    }
  } else {
    alert('Invalid quantity');
  }
}

// Update the portfolio
function updatePortfolio() {
  const portfolioTableBody = document.querySelector('#portfolio-table tbody');
  portfolioTableBody.innerHTML = '';
  let totalValue = 0;

  for (let symbol in portfolio) {
    const stock = stocks.find(s => s.symbol === symbol);
    const { price, quantity } = portfolio[symbol];
    const total = price * quantity;
    totalValue += total;

    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${stock.name} (${symbol})</td>
      <td>$${price.toFixed(2)}</td>
      <td>${quantity}</td>
      <td>$${total.toFixed(2)}</td>
      <td><button class="button" onclick="sellStock('${symbol}')">Sell</button></td>
    `;
    portfolioTableBody.appendChild(row);
  }

  document.getElementById('portfolio-roi').innerText = `ROI: ${calculateROI()}%`;
  document.getElementById('portfolio-diversification').innerText = `Diversification: ${calculateDiversification()}`;
}

// Calculate Return on Investment (ROI)
function calculateROI() {
  let totalInvested = 0;
  let totalValue = 0;

  for (let symbol in portfolio) {
    const stock = stocks.find(s => s.symbol === symbol);
    const { price, quantity } = portfolio[symbol];
    totalInvested += price * quantity;
    totalValue += price * quantity;
  }
  return ((totalValue - totalInvested) / totalInvested) * 100;
}

// Calculate Diversification
function calculateDiversification() {
  const totalValue = Object.values(portfolio).reduce((sum, { price, quantity }) => sum + (price * quantity), 0);
  let diversification = '';
  for (let symbol in portfolio) {
    const stock = stocks.find(s => s.symbol === symbol);
    const { price, quantity } = portfolio[symbol];
    const stockValue = price * quantity;
    diversification += `${stock.name}: ${(stockValue / totalValue * 100).toFixed(2)}% | `;
  }
  return diversification;
}

// Record Transactions (Buy/Sell)
function recordTransaction(symbol, action, quantity, price) {
  const total = price * quantity;
  const transaction = {
    symbol,
    action,
    quantity,
    price,
    total,
    date: new Date().toLocaleString()
  };
  transactionHistory.push(transaction);
  updateTransactionHistory();
}

// Update Transaction History
function updateTransactionHistory() {
  const historyTableBody = document.getElementById('transaction-history-body');
  historyTableBody.innerHTML = ''; // Clear the current history

  transactionHistory.forEach(transaction => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${transaction.symbol}</td>
      <td>${transaction.action}</td>
      <td>${transaction.quantity}</td>
      <td>$${transaction.price.toFixed(2)}</td>
      <td>$${transaction.total.toFixed(2)}</td>
      <td>${transaction.date}</td>
    `;
    historyTableBody.appendChild(row);
  });
}

// Handle Alerts
document.getElementById('alert-form').addEventListener('submit', function (event) {
  event.preventDefault();
  const symbol = document.getElementById('alert-symbol').value.toUpperCase();
  const price = parseFloat(document.getElementById('alert-price').value);
  alerts.push({ symbol, price });
  alert(`Alert set for ${symbol} at $${price.toFixed(2)}`);
});

// Check price alerts every 30 seconds
setInterval(() => {
  alerts.forEach(alert => {
    fetchStockPrices(alert.symbol).then(currentPrice => {
      if (currentPrice && currentPrice >= alert.price) {
        alert(`Price Alert: ${alert.symbol} has reached or exceeded $${alert.price}`);
      }
    });
  });
}, 30000);

// Fetch stock prices periodically (every 30 seconds)
setInterval(async () => {
  for (let stock of stocks) {
    const price = await fetchStockPrices(stock.symbol);
    if (price) {
      stock.price = price;  // Update the stock price
    }
  }
  displayStocks();  // Update the stock list UI
  updatePortfolio();  // Update the portfolio UI
}, 30000);

// Initialize the platform
displayStocks();
updatePortfolio();
// Simulate buying a stock
function buyStock(symbol, price) {
  const quantity = prompt(`How many shares of ${symbol} do you want to buy?`);
  if (quantity && !isNaN(quantity) && quantity > 0) {
      if (!portfolio[symbol]) {
          portfolio[symbol] = { price, quantity: 0 };
      }
      portfolio[symbol].quantity += parseInt(quantity);
      recordTransaction(symbol, 'Buy', quantity, price);
      updateGrowthData();
      updateTransactionHistory(); // Update the transaction history
      alert(`You bought ${quantity} shares of ${symbol} for $${(price * quantity).toFixed(2)}`);
      updatePortfolioTable();
  } else {
      alert('Invalid quantity');
  }
}

// Simulate selling a stock
function sellStock(symbol, price) {
  if (!portfolio[symbol] || portfolio[symbol].quantity === 0) {
      alert('You do not own any shares of this stock.');
      return;
  }
  const quantity = prompt(`How many shares of ${symbol} do you want to sell? (You have ${portfolio[symbol].quantity} shares)`);
  if (quantity && !isNaN(quantity) && quantity > 0 && quantity <= portfolio[symbol].quantity) {
      portfolio[symbol].quantity -= parseInt(quantity);
      recordTransaction(symbol, 'Sell', quantity, price);
      updateGrowthData();
      updateTransactionHistory(); // Update the transaction history
      alert(`You sold ${quantity} shares of ${symbol} for $${(price * quantity).toFixed(2)}`);
      updatePortfolioTable();
  } else {
      alert('Invalid quantity or insufficient shares');
  }
}
// Update transaction history
function updateTransactionHistory() {
  const historyBody = document.getElementById('transaction-history-body');
  historyBody.innerHTML = ''; // Clear the previous transaction rows

  // Loop through the transaction history and populate the table
  transactionHistory.forEach(transaction => {
      const row = document.createElement('tr');
      row.innerHTML = `
          <td>${transaction.symbol}</td>
          <td>${transaction.action}</td>
          <td>${transaction.quantity}</td>
          <td>$${transaction.price.toFixed(2)}</td>
          <td>$${transaction.total.toFixed(2)}</td>
          <td>${transaction.date}</td>
      `;
      historyBody.appendChild(row);
  });
}
