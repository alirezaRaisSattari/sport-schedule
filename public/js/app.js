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
            '<input type="text" style="" class="create-input" placeholder="ورزش مورد نظر را وارد کنید" id="name">',
            '<input type="text" style="width: 44px;" class="create-input" placeholder="قد" id="height">',
            '<input type="text" style="width: 44px;" class="create-input" placeholder="وزن" id="weight">',
            '<input type="text" style="width: 44px;" class="create-input" placeholder="دور شکم" id="bellyAround">',
            ' ',
        ]).draw(false);
    })
    setTimeout(() => {
        let element = document.getElementById("see")

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
                    return `<a onclick="toURL('/lists/${data.id}')" style="cursor:pointer; color: #999;" id="see">مشاهده لیست</a>`;
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
