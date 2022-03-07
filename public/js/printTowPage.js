let param = window.location.pathname.replace("/workouts/", "").split("/")
let workoutId = param[0]
let id = param[1]
let secondId = param[2]
console.log(id, workoutId);

if (!token) {
    window.location.href = '/login'
}
$(document).ready(function () {
    var t = $('#example').DataTable({
        "bPaginate": false,
        "bLengthChange": false,
        "bFilter": true,
        "bInfo": false,
        "bAutoWidth": false,
        "searching": false,
        "ordering": false,
        "columnDefs": [
            { "width": "90%", "targets": 0 }
        ],
    })
    let a = async function postData() {
        try {
            let res = await fetch(`/tasks/${secondId}/${id}`, {
                method: 'GET',
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json'
                },
            })
            let response = await res.json()
            let workoutList = response.list;
            for (let i = 0; i < response.list.length; i++) {
                t.row.add([
                    workoutList[i].sportName,
                    workoutList[i].set,
                    workoutList[i].weight,
                    workoutList[i].number,
                ]).draw(false);
            }
        } catch (error) {
            console.log(error);
        }
    }
    a()


    var table = $('#example2').DataTable({
        "bPaginate": false,
        "bLengthChange": false,
        "bFilter": true,
        "bInfo": false,
        "bAutoWidth": false,
        "searching": false,
        "ordering": false,
        "columnDefs": [
            { "width": "90%", "targets": 0 }
        ],
    })
    let getIt = async function postData() {
        try {
            let res = await fetch(`/tasks/${workoutId}/${id}`, {
                method: 'GET',
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json'
                },
            })
            let response = await res.json()
            let workoutList = response.list;
            for (let i = 0; i < response.list.length; i++) {
                table.row.add([
                    workoutList[i].sportName,
                    workoutList[i].set,
                    workoutList[i].weight,
                    workoutList[i].number,
                ]).draw(false);
            }
        } catch (error) {
            console.log(error);
        }
    }
    getIt()
});
setTimeout(() => {
    window.print()
}, 1000);