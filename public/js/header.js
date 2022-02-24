console.log(localStorage.getItem("token"));
if (localStorage.getItem("token")) {
    document.getElementById('register').style.display = "none";
    document.getElementById('login').style.display = "none";
}
