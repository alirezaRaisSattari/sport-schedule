console.log('Client side javascript file is loaded!')


const callAPI = (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    const weatherTXT = document.getElementById('weatherTXT')
    weatherTXT.innerHTML = 'Loading...'
    const a = async function postData() {
        try {
            const res = await fetch('/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    email,
                    password
                })
            })
            const respon = await res
            const resi = await res.json()
            console.log(resi.user);
            if (respon.status == 201) {
                localStorage.setItem("token", resi.token);
                window.location.href = '/';
            }
        } catch (error) {

            weatherTXT.innerHTML = error
        }
    }
    a()
}