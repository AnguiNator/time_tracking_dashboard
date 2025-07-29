
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
    const stats = document.querySelectorAll('.stats');
    const action = document.querySelectorAll('.action');

    let selection = 'weekly';

    data.forEach(item => {
        stats.forEach(stat => {
            if (stat.dataset.statsName == item.title) {
                stat.innerHTML += `  <p class="hrs">${item.timeframes[selection].current}hrs</p>
                <p class="time">Last Week - ${item.timeframes[selection].previous}hrs</p>`;
            }
        })
    });

    action.forEach(item => {
        item.addEventListener("click", () => {

            action.forEach(noActive => {
                noActive.style.color = '#7078C9';
            })

            selection = item.id;
            const active = document.getElementById(selection);
            active.style.color = "White";


            data.forEach(item => {
                stats.forEach(stat => {
                    if (stat.dataset.statsName == item.title) {
                        stat.innerHTML = ' ';
                        stat.innerHTML += `<p class="hrs">${item.timeframes[selection].current}hrs</p>
                <p class="time">Last Week - ${item.timeframes[selection].previous}hrs</p>`;
                    }
                })
            });
        })
    })
}
