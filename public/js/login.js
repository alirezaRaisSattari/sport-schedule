


const callAPI = (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    const weatherTXT = document.getElementById('weatherTXT')
    weatherTXT.innerHTML = 'Loading...'
    const a = async function postData() {
        try {
            const res = await fetch('/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    password
                })
            })
            const resi = await res.json()
            localStorage.setItem("token", resi.token);
            window.location.href = '/';
        } catch (error) {

        }
    }
    a()
}