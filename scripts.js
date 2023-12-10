// scripts.js

document.addEventListener('DOMContentLoaded', () => {
  fetchDataFromServer();
});

const fetchDataFromServer = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/cryptoData');
    const data = await response.json();

    const cryptoDataContainer = document.getElementById('cryptoData');
    data.forEach(item => {
      const card = document.createElement('div');
      card.classList.add('crypto-card');
      card.innerHTML = `
        <p><strong>Name:</strong> ${item.name}</p>
        <p><strong>Last:</strong> ${item.last}</p>
        <p><strong>Buy:</strong> ${item.buy}</p>
        <p><strong>Sell:</strong> ${item.sell}</p>
        <p><strong>Volume:</strong> ${item.volume}</p>
        <p><strong>Base Unit:</strong> ${item.base_unit}</p>
      `;
      cryptoDataContainer.appendChild(card);
    });
  } catch (error) {
    console.error('Error fetching data from the server:', error.message);
  }
};
