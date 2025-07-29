
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

    let currenttimeframe = 'weekly';

    data.forEach(entry => {
        statsCards.forEach(statCard => {
            if (statCard.dataset.statsName == entry.title) {
                statCard.innerHTML += `  <p class="hrs">${entry.timeframes[currenttimeframe].current}hrs</p>
                <p class="time">Last Week - ${entry.timeframes[currenttimeframe].previous}hrs</p>`;
            }
        })
    });

    filterButtons.forEach(item => {
        item.addEventListener("click", () => {

            filterButtons.forEach(btn => {
                btn.style.color = '#7078C9';
            })

            currenttimeframe = item.id;
            const activeButton = document.getElementById(currenttimeframe);
            activeButton.style.color = "White";


            data.forEach(item => {
                statsCards.forEach(statCard => {
                    if (statCard.dataset.statsName == item.title) {
                        statCard.innerHTML = ' ';
                        statCard.innerHTML += `<p class="hrs">${item.timeframes[currenttimeframe].current}hrs</p>
                <p class="time">Last Week - ${item.timeframes[currenttimeframe].previous}hrs</p>`;
                    }
                })
            });
        })
    })
}
