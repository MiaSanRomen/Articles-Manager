async function createNewUser() {
    let status = []

    let input_username = document.getElementById("username")
    let username = input_username.value
    if (username.trim() === "") {
        return;
    }
    status.push("name OK")
    localStorage.setItem("status", JSON.stringify(status));

    let input_email = document.getElementById("email")
    let email = input_email.value
    if (email.trim() === "") {
        return;
    }
    status.push("email OK")
    localStorage.setItem("status", JSON.stringify(status));
    let input_password = document.getElementById("password")
    let password = input_password.value
    if (password.trim() === "") {
        return;
    }
    status.push("password OK")
    localStorage.setItem("status", JSON.stringify(status));

    let users = JSON.parse(localStorage.getItem("users"));

    /*for (user of users){
        if(user.name===username || user.email===email){
            return
        }
    }*/
    status.push("check OK")
    localStorage.setItem("status", JSON.stringify(status));

    let id = users[users.length - 1].id + 1

    let user = new User(id, username, password, email);
    status.push("Create OK")
    localStorage.setItem("status", JSON.stringify(status));

    users.push(user)
    status.push("Add OK")
    localStorage.setItem("status", JSON.stringify(status));

    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("current_user", JSON.stringify(username));
}
let user = JSON.parse(localStorage.getItem("current_user"))
console.log("Hey", user)
let status = JSON.parse(localStorage.getItem("status"))
console.log("STATUS", status)
