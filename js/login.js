var userId = -1;
var firstName = "";
var lastName = "";

// Login form OnClick event to sign in a user and redirect to index.
function login()
{
    // TODO:
    // - Hash password before making query.

    const login_form = document.getElementById("login-form");
    const email = login_form.email.value;
    const password = login_form.password.value;
    const url = "http://tinytelephonetime.ninja/api/login.php";
    const payload = JSON.stringify({'login': email, 'password':password});

    try
    {
        // Open an XMLHttpRequest to post a login.php request. 
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url, false);
        xhr.setRequestHeader("Content-type", "application/json", "charset=UTF-8");
        xhr.send(payload);
        const response = JSON.parse(xhr.responseText);

        // If the id is < 0, the index of the login information was not found
        // in the database, meaning the input is invalid.
        if (response.id < 1)
        {
            // Update HTML field to show invalid credentials.
            document.getElementById("error-tag").innerHTML = "Incorrect credentials. Please try again.";
            return;
        }

        firstName = response.firstName;
        lastName = response.lastName;
        userId = response.id;

        saveCookie();
        window.location.href = "index.html";
    }
    catch (err)
    {
        // If we get here, there was likely an issue with the API.

        document.getElementById("error-tag").innerHTML = 'Oh no! User could not be logged in. Please try again.';
        document.getElementById("error-tag").style.color = 'white';
        console.error("Error:\n" + err);
    }
}

function logout()
{
    document.cookie = "";
    userId = -1;
    firstName = "";
    lastName = "";
    document.cookie = "firstName= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
    window.location.href = "login.html";
}

function saveCookie()
{
    const minutes = 20;
    var date = new Date();
    date.setTime(date.getTime() + (minutes * 60 * 1000));
    document.cookie = "firstName=" + firstName + ",lastName=" + lastName + ",userId=" + userId + ";expires=" + date.toGMTString();
}

function readCookie()
{
    userId = -1;
    const data = document.cookie;
    const splits = data.split(",");

    for (var i = 0; i < splits.length; i++)
    {
        const s = splits[i].trim();
        const token = s.split("=");

        if (token[0] == "firstName")
            firstName = token[1];
        else if (token[0] == "lastName")
            lastName = token[1];
        else if (token[0] == "userId")
            userId = parseInt(token[1].trim());
        
    }
    
    if (userId < 0)
        window.location.href = "login.html";
    else
        document.getElementById("error-tag").innerHTML = "Logged in as " + firstName + " " + lastName;
}
