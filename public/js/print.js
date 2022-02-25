const param = window.location.pathname.replace("/workouts/", "").split("/")
const workoutId = param[0]
const id = param[1]
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
                ]).draw(false);
            }
            window.print()
        } catch (error) {
            console.log(error);
        }
    }
    a()
});
