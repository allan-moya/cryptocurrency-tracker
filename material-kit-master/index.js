const form = document.querySelector('#searchForm');
let LINEDATA = [];
let data = [];
let labels = [];
form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const res = await axios.get('https://api.coindesk.com/v1/bpi/currentprice.json')
    const text = document.createElement("h3");
    text.innerHTML = res.data.bpi.USD.rate;
    document.getElementById("coin").appendChild(text);
})

graph();
setInterval("graph()", 30000);

function graph() {
    axios.get(`https://api.coindesk.com/v1/bpi/historical/close.json?start=${moment(new Date()).subtract(1, 'month').format('YYYY-MM-DD')}&end=${moment(new Date()).format('YYYY-MM-DD')}`)
        .then((response) => {
            LINEDATA = { ...response.data.bpi };
            data = Object.keys(LINEDATA).map(key => LINEDATA[key]);
            labels = Object.keys(LINEDATA);
            console.log(data);
            console.log(labels);
            new Chart(document.getElementById("chart"), {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [
                        {
                            label: 'Bitcoin',
                            data: data,
                            borderColor: "#3e95cd",
                        }
                    ]
                }
            });
        });
}
