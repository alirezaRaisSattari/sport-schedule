if (localStorage.getItem("token")) {
    document.getElementById('register').style.display = "none";
    document.getElementById('login').style.display = "none";
    document.getElementById('logout').style.display = "inline";
}

const clearStorage = () => {
    localStorage.clear()
    location.reload()
}
