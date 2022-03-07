// const id = window.location.pathname.replace("/lists/", "")
// console.log(id);

// let workoutId = ""
// let total = []
let isCreate = true


// const deleteItem = (listId) => {
//     console.log(id);
//     const a = async function postData() {
//         try {
//             const res = await fetch(`/tasks/${id}/${listId}`, {
//                 method: 'DELETE',
//                 headers: {
//                     'Authorization': token,
//                     'Content-Type': 'application/json'
//                 },
//             })
//             window.location.reload()
//         } catch (error) {
//             console.log(error);
//         }
//     }
//     a()
// }

// const editItem = (id) => {

// }

const create = () => {
    if (!isCreate) { return }
    $(document).ready(function () {
        var t = $('#example').DataTable()
        t.order([0, 'asc']).draw();
        t.row.add([
            '<input type="text" class="create-input" placeholder="نام" id="name">',
            { index: 0 },
        ]).draw(false);
    })
    setTimeout(() => {
        let deleteElement = document.getElementById("deleteElement")

        deleteElement.innerHTML = 'تایید';
        deleteElement.style.cursor = 'pointer';
        deleteElement.style.color = 'green';
        deleteElement.addEventListener('click', () => {
            const name = document.getElementById('name').value
            if (!name) return;
            const a = async function postData() {
                try {
                    const res = await fetch(`/repo/post`, {
                        method: 'POST',
                        body: JSON.stringify({
                            "name": name,
                        }),
                        headers: {
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
        isCreate = false
    }, 50);
}

$(document).ready(function () {
    var t = $('#example').DataTable(
        {
            "searching": false,
            "columnDefs": [{
                "targets": 1,
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
            const res = await fetch(`/repo/get`, {
                method: 'GET',
                // headers: {
                //     'Authorization': token,
                //     'Content-Type': 'application/json'
                // },
            })
            const response = await res.json()
            console.log(response);
            total = response;
            for (let i = 0; i < response.length; i++) {
                t.row.add([
                    response[i].name,
                    response[i],
                ]).draw(false);
            }
        } catch (error) {
            console.log(error);
        }
    }
    a()
});