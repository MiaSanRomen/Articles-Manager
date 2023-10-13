async function tryToLogIn() {
    let input_username = document.getElementById("username")
    let username = input_username.value
    if (username.trim() === "") {
        return;
    }
    let input_password = document.getElementById("password")
    let password = input_password.value
    if (password.trim() === "") {
        return;
    }

    let users = JSON.parse(localStorage.getItem("users"));

    for (user of users){
        if(user.name==username){
            if(user.password==password){
                localStorage.setItem("current_user", JSON.stringify(username));
            }
            return
        }
    }
}
