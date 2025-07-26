const tBody = document.getElementById("table-body");
let cryptoData = [];
const sortMarketCap = document.getElementById("sortMarketCap");
const sortPercentage = document.getElementById("sortPercentage");
const searchQuery = document.getElementById("search");

function queryBasedSearch(query) {
  const searchResults = [...cryptoData].filter((currency) => {
    return (
      currency.name.toLowerCase().includes(query) ||
      currency.symbol.toLowerCase().includes(query)
    );
  });
  renderCurrencies(searchResults);
}
let debounceTimer;
searchQuery.addEventListener("input", (event) => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    const query = event.target.value.trim().toLowerCase();
    queryBasedSearch(query);
  }, 300);
});
sortMarketCap.addEventListener("click", () => {
  const sortedByMarketCap = [...cryptoData].sort(
    (a, b) => a.market_cap - b.market_cap
  );
  renderCurrencies(sortedByMarketCap);
});
sortPercentage.addEventListener("click", () => {
  const sortedByChangePercentage = [...cryptoData].sort(
    (a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h
  );
  renderCurrencies(sortedByChangePercentage);
});
async function fetchData() {
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false"
    );
    if (!response.ok) {
      throw new Error(`response status:+${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err.message);
    throw err;
  }
}

function renderCurrencies(currencies) {
  tBody.innerHTML = "";
  currencies.forEach((currency) => {
    const row = document.createElement("tr");
    row.innerHTML = `<td><img src=${currency.image} alt="${
      currency.name
    } Logo"/>${currency.name}</td>
            <td>${currency.symbol.toUpperCase()}</td>
            <td>$${currency.current_price}</td>
            <td>$${currency.total_volume}</td>
            <td class=${
              currency.price_change_percentage_24h > 0 ? "positive" : "negative"
            }>${currency.price_change_percentage_24h.toFixed(2)}%</td>
            <td>Mkt Cap:$${currency.market_cap}</td>`;
    tBody.appendChild(row);
  });
}

const response = fetchData();
response
  .then((response) => {
    //render all the currencies first
    cryptoData = response;
    renderCurrencies(response);
  })
  .catch((err) => {
    console.log(err.message);
  });
