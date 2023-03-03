

const url = 'http://localhost:3000/weather?address='

const formSelector = document.querySelector('form');
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


formSelector.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = search.value;

    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';

    fetch(url + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error;
            } else {
                messageOne.textContent = 'Location : ' + data.location;
                messageTwo.textContent = 'Temperature : ' + data.temperature
            }
        })
    });
})