console.log('Client side javascript file is loaded!')


const callAPI = (e) => {
    e.preventDefault();
    const address = document.getElementById('address')
    const weatherTXT = document.getElementById('weatherTXT')
    weatherTXT.innerHTML = 'Loading...'
    fetch(`/weather?address=${address.value}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                weatherTXT.innerHTML = data.error
            } else {
                weatherTXT.innerHTML = data.location + "<br/>" + data.forecast
            }
        })
    })
}