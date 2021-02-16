const form = document.querySelector('#searchForm');
form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const res = await axios.get('https://api.coindesk.com/v1/bpi/currentprice.json')
    const text = document.createElement("h3");
    text.innerHTML = res.data.bpi.USD.rate;
    document.getElementById("coin").appendChild(text);
})