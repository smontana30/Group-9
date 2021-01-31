function signup()
{
    const signup_form = document.getElementById("signup-form");
    const email = signup_form.email.value;
    const password = signup_form.password.value;
    const pw_confirm = signup_form.pw_confirm.value;
    const firstName = signup_form.firstName.value;
    const lastName = signup_form.lastName.value;
    const url = "http://68.183.59.220/api/adduser.php";
    const signup_obj = {
        'firstName':firstName,
        'lastName':lastName,
        'login':email,
        'password':password
    }
    const payload = JSON.stringify(signup_obj);
    console.log("Payload: " + payload);
    var xhr = new XMLHttpRequest();

    if (password.localeCompare(pw_confirm) != 0)
    {
        const msg = "Passwords don't match.";
        console.log(msg);
        document.getElementById("error-tag").innerHTML = msg;
        return;
    }

    xhr.open("POST", url, false);
    xhr.setRequestHeader("Content-type", "application/json", "charset=UTF-8");

    try
    {
        xhr.send(payload);
        const response = JSON.parse(xhr.responseText);
        if (response.error.localeCompare("") != 0)
        {
            document.getElementById("error-tag").innerHTML = response.error;
            console.log(response.error);
            return;
        }
        window.location.href = "index.html";
    }
    catch (err)
    {
        // If we get here, there was likely an issue with the API.
        document.getElementById("error-tag").innerHTML = err.message;
        console.error("Error:\n" + err);
    }
}
