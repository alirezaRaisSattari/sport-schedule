const param = window.location.pathname.replace("/workouts/", "").split("/")
const listId = param[0]
const id = param[1]

if (!token) {
    window.location.href = '/login'
}
let isCreate = true

const doPrint = () => {
    window.location.href = `${window.location.pathname}/print`
}
const doPrint2 = () => {

    var favDialog = document.getElementById('favDialog');
    var mainSelect = document.getElementById('mainSelect');
    mainSelect.innerHTML = "<option value='' disabled selected>تاریخ لیست را مشخص کنید</option>"


    if (typeof favDialog.showModal === "function") {
        favDialog.showModal();
    } else {
        alert("The <dialog> API is not supported by this browser");
    }
    favDialog.addEventListener('close', function onClose() {
        if (favDialog.returnValue == 'default' && mainSelect.value)
            window.location.href = `${window.location.pathname}/${mainSelect.value}/print2`
    });

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
            for (let i = 0; i < response.plan.length; i++) {
                mainSelect.innerHTML += `<option value='${response.plan[i]._id}'>${response.plan[i].date}</option>`
            }
        } catch (error) {
            console.log(error);
        }
    }
    a()

}
const deleteItem = (workoutId) => {
    const a = async function postData() {
        try {
            const res = await fetch(`/tasks/${id}/${listId}/${workoutId}`, {
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
        t.order([0, 'des']).draw();
        t.row.add([
            '<input type="text" style="width:100%;" onclick="myFunction()" onchange="search()" class="dropbtn" placeholder="ورزش مورد نظر را وارد کنید" id="sportName">' +
            '<div id="dropdown" class="dropdown-content"></div>',
            '<input type="text" style="width: 44px;" class="create-input" placeholder="ست" id="set">',
            '<input type="text" style="width: 44px;" class="create-input" placeholder="وزن" id="weight">',
            '<input type="text" style="width: 44px;" class="create-input" placeholder="تعداد" id="number">',
            '<p id="see" style="cursor: pointer; padding: 0; margin:0;">تایید</p>',
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
                    const res = await fetch(`/tasks/updateWorkout/${id}/${listId}`, {
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
        sportName.addEventListener('input', (e) => {
            let searchAPI = async function postData() {
                try {
                    const res = await fetch(`/repo/get`, {
                        method: 'GET',
                        headers: {
                            // 'Authorization': token,
                            'Content-Type': 'application/json'
                        },
                    })
                    const response = await res.json()
                    document.getElementById('dropdown').innerHTML = ""
                    for (let i = 0; i < response.length; i++) {
                        if (response[i].name.includes(e.target.value)) {
                            document.getElementById('dropdown').innerHTML += `<a>${response[i].name}</a>`
                        }
                    }
                } catch (error) {
                    console.log(error);
                }
            }
            searchAPI()
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
            "sEmptyTable": "لیست خالی است",
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
            const res = await fetch(`/tasks/${listId}/${id}`, {
                method: 'GET',
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json'
                },
            })
            const response = await res.json()
            const workoutList = response.list;
            for (let i = 0; i < response.list.length; i++) {
                t.row.add([
                    workoutList[i].sportName,
                    workoutList[i].set,
                    workoutList[i].weight,
                    workoutList[i].number,
                    "<div style='display: flex; justify-content: center;' id='deleteElement' >" +
                    `<i class="fa fa-trash" onclick="deleteItem('${workoutList[i]._id}')" style='color:red; cursor:pointer;' aria-hidden="true"></i>` +
                    `<i class="fas fa-edit" onclick="editItem('${workoutList[i]._id}')" style='color:#a7a700; margin-left:10px; margin-right:10px; cursor:pointer;'></i>` +
                    `</div>`
                ]).draw(false);
            }
        } catch (error) {
            console.log(error);
        }
    }
    a()
});


////////////////

function myFunction() {
    let e = document.getElementById("sportName")
    let searchAPI = async function postData() {
        try {
            const res = await fetch(`/repo/get`, {
                method: 'GET',
                headers: {
                    // 'Authorization': token,
                    'Content-Type': 'application/json'
                },
            })
            const response = await res.json()
            document.getElementById('dropdown').innerHTML = ""
            for (let i = 0; i < response.length; i++) {
                if (response[i].name.includes(e.value)) {
                    document.getElementById('dropdown').innerHTML += `<a>${response[i].name}</a>`
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
    searchAPI()
    document.getElementById("dropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function (event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

