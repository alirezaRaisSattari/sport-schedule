const token = localStorage.getItem("token")

if (!token) {
    window.location.href = '/login'
}
let isCreate = true

const toURL = (URL) => {
    if (URL.includes("undefined")) return;
    window.location.href = URL
}

const create = () => {
    if (!isCreate) { return }
    $(document).ready(function () {
        var t = $('#example').DataTable()
        t.row.add([
            '<input type="text" id="name">',
            '<input type="text" id="height">',
            '<input type="text" id="weight">',
            '<input type="text" id="bellyAround">',
            ' <button>finn</button>',
        ]).draw(false);
    })
    setTimeout(() => {
        let element = document.getElementById("see")

        element.innerHTML = 'done';
        element.style.color = 'green';
        element.addEventListener('click', () => {
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
        });
    }, 50);
    isCreate = false
}

$(document).ready(function () {
    var t = $('#example').DataTable(
        {
            "columnDefs": [{
                "targets": 4,
                "data": "4",
                "render": function (data) {
                    return `<a onclick="toURL('/lists/${data.id}')" style="cursor:pointer" id="see">مشاهده لیست</a>`;
                },
            },
            { "width": "40%", "targets": 0 },
            { "width": "20%", "targets": 4 }
            ],
            "oLanguage": {
                "sSearch": "جست و جو:",
                "sInfoFiltered": "ورودی",
                "sInfo": "نمایش _START_ تا _END_ از _TOTAL_ ورودی",
                "sLengthMenu": "نمایش _MENU_ ورودی",
                "sEmptyTable": "لیست خالی است",
                "oPaginate": {
                    "sPrevious": "قبلی",
                    "sNext": "بعدی",
                },
                "emptyTable": " این لیست خالی است",
                "sInfoEmpty": "",
            },
        }
    )
    const a = async function postData() {
        try {
            const res = await fetch('/tasks', {
                method: 'GET',
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json'
                },
            })
            const response = await res.json()
            console.log(response);
            for (let i = 0; i < response.length; i++) {
                t.row.add([
                    response[i].name,
                    response[i].height,
                    response[i].weight,
                    response[i].bellyAround,
                    { id: response[i]._id, name: response[i].name },
                ]).draw(false);
            }
        } catch (error) {
            console.log(error);
        }
    }
    a()
});
