
async function fetchData() {
    const response = await fetch('https://raw.githubusercontent.com/AnguiNator/time_tracking_dashboard/refs/heads/main/assets/data/data.json');
    if (!response.ok) {
        throw new Error(`HTTP error: ${response}`);
    }
    const data = await response.json();
    return data;
}

const promise = fetchData();
promise
    .then((data) => {
        dataDOM(data);
    })
    .catch((error) => {
        console.log(`Could not get information: ${error}`);
    })


function dataDOM(data) {
    const statsCards = document.querySelectorAll('.stats');
    const filterButtons = document.querySelectorAll('.action');

    updateView('weekly', data, statsCards);

    filterButtons.forEach(item => {
        item.addEventListener("click", () => {


            filterButtons.forEach(btn => {
                btn.classList.remove('active')
            })

            const activeButton = document.getElementById(item.id);
            activeButton.classList.add('active');

            updateView(item.id, data, statsCards);
        })
    })
}

function updateView(timeframe, data, cards) {
    const timeLabels = { daily: 'Yesterday', weekly: 'Last Week', monthly: 'Last Mont' }
    const cardMaps = new Map([...cards].map(card => [card.dataset.statsName, card]));

    data.forEach(entry => {
        if (cardMaps.has(entry.title)) {
            const statCard = cardMaps.get(entry.title);
            const hrsElement = document.createElement('p');
            const timeElement = document.createElement('p');

            hrsElement.className = 'hrs';
            timeElement.className = 'time';
            statCard.textContent = ' ';
            hrsElement.textContent = `${entry.timeframes[timeframe].current}hrs`;
            timeElement.textContent = `${timeLabels[timeframe]} - ${entry.timeframes[timeframe].previous}hrs`;
            statCard.append(hrsElement);
            statCard.append(timeElement);
        }
    })
}