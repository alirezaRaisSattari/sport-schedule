const token = localStorage.getItem("token")
const param = window.location.pathname.replace("/workouts/", "").split("/")
const workoutId = param[0]
const id = param[1]
console.log(id, workoutId);

if (!token) {
    window.location.href = '/login'
}
let isCreate = true

const doPrint = () => {
    window.location.href = `${window.location.pathname}/print`
}

const create = () => {
    if (!isCreate) { return }
    $(document).ready(function () {
        var t = $('#example').DataTable()
        t.row.add([
            '<input type="text" id="sportName">',
            '<input type="text" id="set">',
            '<input type="text" id="weight">',
            '<input type="text" id="number">',
            '<p id="see" style="cursor: pointer;">done</p>',
        ]).draw(false);
    })
    setTimeout(() => {
        let element = document.getElementById("see")
        element.style.color = 'green';
        element.addEventListener('click', () => {
            const sportName = document.getElementById('sportName').value
            const set = document.getElementById('set').value
            const weight = document.getElementById('weight').value
            const number = document.getElementById('number').value
            if (!sportName) return;
            const a = async function postData() {
                try {
                    const res = await fetch(`/tasks/updateWorkout/${id}/${workoutId}`, {
                        method: 'POST',
                        body: JSON.stringify({
                            sportName,
                            set,
                            weight,
                            number
                        }),
                        headers: {
                            'Authorization': token,
                            'Content-Type': 'application/json'
                        },
                    })
                    window.location.reload()
                } catch (error) {
                    console.log(error);
                }
            }
            a()
        });
    }, 50);
    isCreate = false
}

$(document).ready(function () {
    var t = $('#example').DataTable({
        "columnDefs": [
            { "width": "90%", "targets": 0 }
        ],
        "oLanguage": {
            "sSearch": "جست و جو:",
            "sInfoFiltered": "ورودی",
            "sInfo": "نمایش _START_ تا _END_ از _TOTAL_ ورودی",
            "sLengthMenu": "نمایش _MENU_ ورودی",
            "oPaginate": {
                "sPrevious": "قبلی",
                "sNext": "بعدی",
            },
            "emptyTable": "این لیست خالی است",
        },
    })
    const a = async function postData() {
        try {
            const res = await fetch(`/tasks/${workoutId}/${id}`, {
                method: 'GET',
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json'
                },
            })
            const response = await res.json()
            console.log(response.list);
            const workoutList = response.list;
            console.log(workoutList[0].sportName);
            for (let i = 0; i < response.list.length; i++) {
                t.row.add([
                    workoutList[i].sportName,
                    workoutList[i].set,
                    workoutList[i].weight,
                    workoutList[i].number,
                    ":)",
                ]).draw(false);
            }
        } catch (error) {
            console.log(error);
        }
    }
    a()
});
