function login()
{
    // Change to push to remote.
    const login_form = document.getElementById("login-form"); 
    const email = login_form.email.value;
    const password = login_form.password.value;
    const payload = '{"login":"' + email + '", "password":"' + password + '"}';
    const url = "http://68.183.59.220/api/login.php";

    console.log(payload)

    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, false)
    xhr.setRequestHeader("Content-type", "application/json", "charset=UTF-8")

    try
    {
        xhr.send(payload);
        const response = JSON.parse(xhr.responseText)
        console.log(response)
    }
    catch (err)
    {
        // show an error message
    }
}

function logout()
{

}

function saveCookie()
{

}

function readCookie()
{
    
}
