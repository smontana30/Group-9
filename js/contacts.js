var userId = -1;

function getContacts()
{
    readCookie();
    const url = "http://68.183.59.220/api/get_contacts.php?UserID=" + userId;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, false);
    xhr.send(null);
    return JSON.parse(xhr.responseText);
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
        
        if (userId < 0)
            window.location.href = "login.html";
        else
            document.getElementById("error-tag").innerHTML = "Logged in as " + firstName + " " + lastName;
    }
}
