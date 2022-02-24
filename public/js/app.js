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
                    return `<a onclick="toURL('/lists/${data.id}')" style="cursor:pointer" id="see">see lists</a>`;
                }
            }]
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

// function closePrint() {
//     document.body.removeChild(this.__container__);
// }

// function setPrint() {
//     this.contentWindow.__container__ = this;
//     this.contentWindow.onbeforeunload = closePrint;
//     this.contentWindow.onafterprint = closePrint;
//     this.contentWindow.focus(); // Required for IE
//     this.contentWindow.print();
// }

// function printPage(sURL) {
//     var oHideFrame = document.createElement("iframe");
//     oHideFrame.onload = setPrint;
//     oHideFrame.style.position = "fixed";
//     oHideFrame.style.right = "0";
//     oHideFrame.style.bottom = "0";
//     oHideFrame.style.width = "0";
//     oHideFrame.style.height = "0";
//     oHideFrame.style.border = "0";
//     oHideFrame.src = sURL;
//     document.body.appendChild(oHideFrame);
// }
// printPage('http://localhost:3000/')
