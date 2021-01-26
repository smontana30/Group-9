// Login form OnClick event to sign in a user and redirect to index.
function login()
{
    // TODO:
    // - Hash password before making query.
    // - Make it so failed login attempts display in the form.

    const login_form = document.getElementById("login-form"); 
    const email = login_form.email.value;
    const password = login_form.password.value;
    const url = "http://68.183.59.220/api/login.php";

    var obj = {};
    obj.login = email;
    obj.password = password;

    const payload = JSON.stringify(obj);

    console.log("Sending " + payload + " to " + url);

    // Open an XMLHttpRequest to post a login.php request. 
    var xhr = new XMLHttpRequest();
    console.log("New XMLHttp request established.");
    xhr.open("POST", url, false);
    console.log("Open POST request.");
    xhr.setRequestHeader("Content-type", "application/json", "charset=UTF-8");
    console.log("Set header. Trying to send payload");

    try
    {
        xhr.send(payload);
        console.log("Payload sent.")
        const response = JSON.parse(xhr.responseText);

        console.log("Response: " + response);
        console.log(" id: " + response.id);
        console.log(" firstName: " + response.firstName);
        console.log(" lastName: " + response.lastName);

        // If the id is < 0, the index of the login information was not found
        // in the database, meaning the input is invalid.
        if (response.id < 1)
        {
            // Update HTML field to show invalid credentials.
            console.log("Login attempt failed.");
            return;
        }

        console.log("Login attempt succeeded.")

        // TODO: Make a cookie
    }
    catch (err)
    {
        // If we get here, there was likely an issue with the API.
        console.error("Error:\n" + err);
    }
}

function logout()
{
    // Delete cookie
}

function saveCookie()
{

}

function readCookie()
{
    
}
