
const callAPI = (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value
    const bellyAround = document.getElementById('bellyAround').value
    const weight = document.getElementById('weight').value
    const height = document.getElementById('height').value
    const a = async function postData() {
        try {
            const res = await fetch('/tasks', {
                method: 'POST',
                body: JSON.stringify({
                    name,
                    bellyAround,
                    weight,
                    height,
                }),
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json'
                },
            })
            window.location.href = '/'
        } catch (error) {
            console.log(error);
        }
    }
    a()
}