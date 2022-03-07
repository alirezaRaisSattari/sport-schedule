let isCreate = true

const toURL = (URL) => {
    if (URL.includes("undefined")) return;
    window.location.href = URL
}

const deleteItem = (id) => {
    const a = async function postData() {
        try {
            const res = await fetch(`/tasks/${id}`, {
                method: 'DELETE',
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

const editItem = (id) => {

}

const create = () => {
    if (!isCreate) { return }
    $(document).ready(function () {
        var t = $('#example').DataTable()
        t.order([0, 'asc']).draw();
        t.row.add([
            '<input type="text" style="" class="create-input" placeholder="نام مخاطب را وارد کنید" id="name">',
            '<input type="text" style="width: 44px;" class="create-input" placeholder="قد" id="height">',
            '<input type="text" style="width: 44px;" class="create-input" placeholder="وزن" id="weight">',
            '<input type="text" style="width: 44px;" class="create-input" placeholder="دور شکم" id="bellyAround">',
            ' ',
            ' ',
        ]).draw(true);
    })
    setTimeout(() => {
        let element = document.getElementById("see")
        document.getElementById("editDelete").style.display = 'none'

        if (element) {
            element.innerHTML = 'تایید';
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
        }
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
                    return `<a onclick="toURL('/lists/${data.id}')" style="cursor:pointer; color: #999;" id="see">مشاهده لیست ها</a>`
                },
            },
            {
                "targets": 5,
                "render": function (data) {
                    return "<div style='display: flex; justify-content: center;' id='editDelete'>" +
                        `<i class="fa fa-trash" onclick="deleteItem('${data.id}')" style='color:red; cursor:pointer;' aria-hidden="true"></i>` +
                        `<i class="fas fa-edit" onclick="editItem('${data.id}')" style='color:#a7a700; margin-left:10px; margin-right:10px; cursor:pointer;'></i>` +
                        `</div>`;
                },
            },
            { "width": "40%", "targets": 0 },
            { "width": "23%", "targets": 4 },
            ],
            "oLanguage": {
                "sSearch": "جست و جو:",
                "sInfoFiltered": "ورودی",
                "sInfo": "نمایش _START_ تا _END_ از _TOTAL_ ورودی",
                "sLengthMenu": "نمایش _MENU_ ورودی",
                "sEmptyTable": "مخاطب جدید اضافه کنید",
                "oPaginate": {
                    "sPrevious": "قبلی",
                    "sNext": "بعدی",
                },
                "emptyTable": "مخاطب جدید اضافه کنید",
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
            for (let i = 0; i < response.length; i++) {
                t.row.add([
                    response[i].name,
                    response[i].height,
                    response[i].weight,
                    response[i].bellyAround,
                    { id: response[i]._id, name: response[i].name },
                    { id: response[i]._id, name: response[i].name },
                ]).draw(false);
            }
        } catch (error) {
            console.log(error);
        }
    }
    a()
});