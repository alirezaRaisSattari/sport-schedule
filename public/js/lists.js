const id = window.location.pathname.replace("/lists/", "")
console.log(id);

let workoutId = ""
let total = []
let isCreate = true


const toWorkout = (workoutID) => {
    console.log(workoutID);
    if (workoutID == 'undefined') return;
    window.location.href = `/workouts/${workoutID}/${id}`
}

const deleteItem = (listId) => {
    console.log(id);
    const a = async function postData() {
        try {
            const res = await fetch(`/tasks/${id}/${listId}`, {
                method: 'DELETE',
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
}

const editItem = (id) => {

}

const create = () => {
    if (!isCreate) { return }
    $(document).ready(function () {
        var t = $('#example').DataTable()
        t.order([0, 'asc']).draw();
        t.row.add([
            '',
            '<input type="text" class="create-input" placeholder="تاریخ" id="date">',
            { index: 0 },
            { index: 0 },
        ]).draw(false);
    })
    setTimeout(() => {
        let element = document.getElementById("see")
        let deleteElement = document.getElementById("deleteElement")

        element.innerHTML = 'تایید';
        deleteElement.style.display = 'none';
        element.style.color = 'green';
        element.addEventListener('click', () => {
            const date = document.getElementById('date').value
            if (!date) return;
            const a = async function postData() {
                try {
                    const res = await fetch(`/tasks/updateLists/${id}`, {
                        method: 'POST',
                        body: JSON.stringify({
                            date,
                        }),
                        headers: {
                            'Authorization': token,
                            'Content-Type': 'application/json'
                        },
                    })
                    window.location.href = `/lists/${id}`
                } catch (error) {
                    console.log(error);
                }
            }
            a()
        });
        isCreate = false
    }, 50);
}

$(document).ready(function () {
    var t = $('#example').DataTable(
        {
            "searching": false,
            "columnDefs": [{
                "targets": 2,
                "data": "2",
                "render": (data) => {
                    workoutId = data.id
                    return `<a onclick="toWorkout('${data.id}')" style="cursor: pointer; color: #999;" id="see">نمایش تمرین ها</a>`
                }
            },
            {
                "targets": 3,
                "render": function (data) {
                    return "<div style='display: flex; justify-content: center;' id='deleteElement' >" +
                        `<i class="fa fa-trash" onclick="deleteItem('${data.id}')" style='color:red; cursor:pointer;' aria-hidden="true"></i>` +
                        `<i class="fas fa-edit" onclick="editItem('${data.id}')" style='color:#a7a700; margin-left:10px;  margin-right:10px; cursor:pointer;'></i>` +
                        `</div>`;
                },
            },
            ],
            "oLanguage": {
                "sSearch": "جست و جو:",
                "sInfoFiltered": "ورودی",
                "sInfo": "نمایش _START_ تا _END_ از _TOTAL_ ورودی",
                "sEmptyTable": "لیست خالی است",
                "sLengthMenu": "نمایش _MENU_ ورودی",
                "oPaginate": {
                    "sPrevious": "قبلی",
                    "sNext": "بعدی",
                },
                "emptyTable": "این لیست خالی است",
            },
        }
    )
    const a = async function postData() {
        try {
            const res = await fetch(`/tasks/${id}`, {
                method: 'GET',
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json'
                },
            })
            const response = await res.json()
            console.log(response.plan[0].list);
            total = response;
            for (let i = 0; i < response.plan.length; i++) {
                t.row.add([
                    i + 1,
                    response.plan[i].date,
                    { length: response.plan[i].list, id: response.plan[i]._id },
                    { length: response.plan[i].list, id: response.plan[i]._id },
                ]).draw(false);
            }
        } catch (error) {
            console.log(error);
        }
    }
    a()
});