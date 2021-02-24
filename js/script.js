let offset = 0; // For selecting previous/next couple of contacts.
let id = 1;
const length = 12; // Number of contacts to show on the screen.
let currentLen = length;

function addContact() {
    // // getting out list element
    let div = document.getElementById('card');

    // // getting our inputs
    let firstName = document.getElementById('firstName').value;
    let lastName = document.getElementById('lastName').value;
    // Create a function to remove any non-digits from the phone number.
    let phoneNum = document.getElementById('phone-number').value;

    try {
        let payload = JSON.stringify({
            'FirstName': firstName,
            'LastName': lastName,
            'Phone': phoneNum,
            'UserID': getUserID()
        });
        let url = "http://tinytelephonetime.ninja/api/add_contact.php";
        let xhr = new XMLHttpRequest();
        xhr.open("POST", url, false);
        xhr.setRequestHeader("Content-type", "application/json", "charset=UTF-8");
        xhr.send(payload);
    } catch (error) {
        // If we get here, there was likely an issue with the API.
        // document.getElementById("error-tag").innerHTML = err.message;
        console.error("Error:\n" + error)
    }
    currentLen++;
    // getNewContact(firstName + " " + lastName);

    id = el.ID == undefined ? id : el.ID;

    let divBody = document.createElement("div");
    divBody.setAttribute('class', "card-body");
    divBody.setAttribute('id', "cardbody " + id);
    let cardimg = document.createElement('img');
    cardimg.setAttribute('class', 'card-img-top');
    cardimg.setAttribute('id', "cardimg " + id);
    let cardTitle = document.createElement('h5');
    cardTitle.setAttribute('class', "card-title");
    cardTitle.setAttribute('id', "cardtitle " + id);
    let cardText = document.createElement('h6');
    cardText.setAttribute('class', 'card-text');
    cardText.setAttribute('id', "cardtext " + id);

    // getting our inputs


    // attempting to add image but it wasn't working and i got frustated 
    let firLetter = firstName.toLowerCase().charAt(0);

    cardimg.src = "https://raw.githubusercontent.com/smontana30/Group-9/master/assets/letters/png/" + firLetter + ".png";


    // Changing the card ID to be the contact ID to allow for easier deletion and editing.


    // if we are searching for information already on the website we delete the info already
    // on it and replace it with a new card. this is to avoid having duplicate cards
    let cards = document.getElementsByClassName("card");
    // search for fname lname to know which card to delete
    for (let i = 0; i < cards.length; i++) {
        let cardTitle = cards[i].getElementsByClassName('card-title')[0];
        let textContent = cardTitle.textContent;
        let str = firstName + " " + lastName;
        if (textContent.match(str)) {
            cards[i].remove();
        }
    }

    cardTitle.appendChild(document.createTextNode(firstName + " " + lastName));
    cardText.appendChild(document.createTextNode(phoneNum));

    let cardDiv = document.createElement("div");
    cardDiv.setAttribute('class', "card");
    cardDiv.setAttribute('id', el.ID);
    // cardDiv.setAttribute('data-bs-toggle', 'modal');
    // cardDiv.setAttribute('data-bs-target', '#myModal3');

    // cardDiv.addEventListener('click', function() {
    //     document.getElementById('fullName').innerText = fName + " " + lName;
    //     document.getElementById('phNumber').innerText = number;
    // })

    let updateBtn = document.createElement('button');
    updateBtn.innerHTML = "Update";
    updateBtn.setAttribute('class', "btn btn-warning");
    updateBtn.setAttribute('id', 'update ' + id)
    updateBtn.setAttribute('data-bs-toggle', "modal");
    updateBtn.setAttribute('data-bs-target', "#myModal2");

    updateBtn.addEventListener('click', function() {
        let currId = this.id.split(" ");
        let contactId = document.getElementsByClassName('updateContactId');
        document.getElementById('saveUp').setAttribute('class', 'btn btn-secondary')
        contactId[0].setAttribute('id', 'modal ' + currId[1]);

    })

    let deleteBtn = document.createElement('button');
    deleteBtn.setAttribute('class', "btn btn-danger");
    deleteBtn.setAttribute('id', "delete " + id);
    deleteBtn.innerText = "Delete";
    deleteBtn.addEventListener('click', function() {
        let cards = document.getElementsByClassName("card");
        let updateId = 0;
        // search for fname lname to know which card to delete
        for (let i = 0; i < cards.length; i++) {
            let cardTitle = cards[i].getElementsByClassName('card-title')[0];
            let textContent = cardTitle.textContent;
            let str = firstName + " " + lastName;
            if (textContent.match(str)) {
                updateId = cards[i].id;
                cards[i].remove();

                try {
                    let payload = JSON.stringify({
                        'ID': updateId,
                        'UserID': getUserID()
                    });
                    let url = "http://tinytelephonetime.ninja/api/delete_contact.php";
                    let xhr = new XMLHttpRequest();
                    xhr.open("POST", url, false);
                    xhr.setRequestHeader("Content-type", "application/json", "charset=UTF-8");
                    xhr.send(payload);
                } catch (error) {
                    // If we get here, there was likely an issue with the API.
                    // document.getElementById("error-tag").innerHTML = err.message;
                    console.error("Error:\n" + err)
                }
            }
        }
    });


    divBody.appendChild(cardTitle);
    divBody.appendChild(cardText);
    divBody.appendChild(updateBtn);
    divBody.appendChild(deleteBtn);

    // adding our list item to our list
    cardDiv.appendChild(cardimg);
    cardDiv.appendChild(divBody);
    div.appendChild(cardDiv);


    id++;

    document.getElementById('firstName').value = "";
    document.getElementById('lastName').value = "";
    document.getElementById('phone-number').value = "";

    // getContacts();
}

// Function called to send a POST request to the API and display contact cards
// to the screen, omitting the query parameter.
async function getContacts() {
    const url_online = 'http://tinytelephonetime.ninja/api/get_contacts.php';

    // URL Parameters:
    // - UserID: The unique ID of the currently logged in user, stored in a cookie.
    // - length: The number of contacts to return.
    // - offset: Number of contacts to skip in the array being returned.

    const params = '?UserID=' + getUserID() + '&length=' + currentLen + '&offset=' + offset;
    fetchContactsWithUrl(url_online + params);
}

// Function called to send a POST request to the API and display contact cards
// to the screen, including the query parameter.
async function getContactsWithSearch() {
    let searchBar = document.getElementById("search");
    const url = 'http://tinytelephonetime.ninja/api/get_contacts.php';

    // URL Parameters:
    // - UserID: The unique ID of the currently logged in user, stored in a cookie.
    // - length: The number of contacts to return.
    // - offset: Number of contacts to skip in the array being returned.
    // - query : Search string applied to each individual column of the database.

    const params = '?UserID=' + getUserID() + '&length=' + length + '&offset=' + offset + '&query=' + searchBar.value;

    // If someone attempts to query an empty string, return all the contacts.
    if (searchBar.value == '') {
        alert("Error: Please search for a valid user");
        //getContacts();
        return;
    }

    fetchContactsWithUrl(url + params);
}

// Function called to send a POST request to the API and display contact cards
// to the screen, including the query parameter.
async function getAllContactsWithSearch() {
    const url = 'http://tinytelephonetime.ninja/api/get_contacts.php';

    // URL Parameters:
    // - UserID: The unique ID of the currently logged in user, stored in a cookie.
    // - length: The number of contacts to return.
    // - offset: Number of contacts to skip in the array being returned.
    // - query : Search string applied to each individual column of the database.

    const params = '?UserID=' + getUserID();

    fetchContactsWithUrl(url + params);
}

// Helper function of both getContacts functions which makes the request. If
// the request to the Group9 Website API fails, attempt the PokeAPI.
async function fetchContactsWithUrl(url) {
    let contacts = null;
    const url_offline = 'https://pokeapi.co/api/v2/pokemon?limit=' + currentLen + '&offset=' + offset;

    // Assign contacts to the results of the url request.
    await fetch(url)
        .then(response => response.json())
        .then(results => { contacts = results })
        .catch(_error => { console.log("Error with fetching Group9 API contacts. Trying PokeAPI.") });

    // Call to the Group9 API failed. Attempt with PokeAPI.
    if (contacts == null) {
        await fetch(url_offline)
            .then(response => response.json())
            .then(results => { contacts = results })
            .catch(_error => { console.log("Error with fetching PokeAPI contacts.") });
    }

    if (currentLen > (contacts.results.length + 1)) {
        currentLen = contacts.results.length;
    }

    // Display contact cards.
    await makeContacts(contacts);
}




async function makeContacts(contacts) {
    const data = document.cookie;
    const UserName = data.split(",");
    const name = UserName[0].split("=");
    document.getElementById('mySpan').innerHTML = "Welcome " + name[1];

    // getting out list element
    let div = document.getElementById('card');


    contacts.results.forEach(el => {

        id = el.ID == undefined ? id : el.ID;

        let divBody = document.createElement("div");
        divBody.setAttribute('class', "card-body");
        divBody.setAttribute('id', "cardbody " + id);
        let cardimg = document.createElement('img');
        cardimg.setAttribute('class', 'card-img-top');
        cardimg.setAttribute('id', "cardimg " + id);
        let cardTitle = document.createElement('h5');
        cardTitle.setAttribute('class', "card-title");
        cardTitle.setAttribute('id', "cardtitle " + id);
        let cardText = document.createElement('h6');
        cardText.setAttribute('class', 'card-text');
        cardText.setAttribute('id', "cardtext " + id);

        // getting our inputs
        let fName = el.name == undefined ? el.FirstName : el.name;

        // attempting to add image but it wasn't working and i got frustated 
        let firLetter = fName.toLowerCase().charAt(0);

        cardimg.src = "https://raw.githubusercontent.com/smontana30/Group-9/master/assets/letters/png/" + firLetter + ".png";

        let lName = el.LastName == undefined ? "lastname" : el.LastName;
        let number = el.Phone == undefined ? "1231231234" : el.Phone;

        // Changing the card ID to be the contact ID to allow for easier deletion and editing.


        // if we are searching for information already on the website we delete the info already
        // on it and replace it with a new card. this is to avoid having duplicate cards
        let cards = document.getElementsByClassName("card");
        // search for fname lname to know which card to delete
        for (let i = 0; i < cards.length; i++) {
            let cardTitle = cards[i].getElementsByClassName('card-title')[0];
            let textContent = cardTitle.textContent;
            let str = fName + " " + lName;
            if (textContent.match(str)) {
                cards[i].remove();
            }
        }

        cardTitle.appendChild(document.createTextNode(fName + " " + lName));
        cardText.appendChild(document.createTextNode(number));

        let cardDiv = document.createElement("div");
        cardDiv.setAttribute('class', "card");
        cardDiv.setAttribute('id', el.ID);
        // cardDiv.setAttribute('data-bs-toggle', 'modal');
        // cardDiv.setAttribute('data-bs-target', '#myModal3');

        // cardDiv.addEventListener('click', function() {
        //     document.getElementById('fullName').innerText = fName + " " + lName;
        //     document.getElementById('phNumber').innerText = number;
        // })

        let updateBtn = document.createElement('button');
        updateBtn.innerHTML = "Update";
        updateBtn.setAttribute('class', "btn btn-warning");
        updateBtn.setAttribute('id', 'update ' + id)
        updateBtn.setAttribute('data-bs-toggle', "modal");
        updateBtn.setAttribute('data-bs-target', "#myModal2");

        updateBtn.addEventListener('click', function() {
            let currId = this.id.split(" ");
            let contactId = document.getElementsByClassName('updateContactId');
            document.getElementById('saveUp').setAttribute('class', 'btn btn-secondary')
            contactId[0].setAttribute('id', 'modal ' + currId[1]);

        })

        let deleteBtn = document.createElement('button');
        deleteBtn.setAttribute('class', "btn btn-danger");
        deleteBtn.setAttribute('id', "delete " + id);
        deleteBtn.innerText = "Delete";
        deleteBtn.addEventListener('click', function() {
            let cards = document.getElementsByClassName("card");
            let updateId = 0;
            // search for fname lname to know which card to delete
            for (let i = 0; i < cards.length; i++) {
                let cardTitle = cards[i].getElementsByClassName('card-title')[0];
                let textContent = cardTitle.textContent;
                let str = fName + " " + lName;
                if (textContent.match(str)) {
                    updateId = cards[i].id;
                    cards[i].remove();

                    try {
                        let payload = JSON.stringify({
                            'ID': updateId,
                            'UserID': getUserID()
                        });
                        let url = "http://tinytelephonetime.ninja/api/delete_contact.php";
                        let xhr = new XMLHttpRequest();
                        xhr.open("POST", url, false);
                        xhr.setRequestHeader("Content-type", "application/json", "charset=UTF-8");
                        xhr.send(payload);
                    } catch (error) {
                        // If we get here, there was likely an issue with the API.
                        // document.getElementById("error-tag").innerHTML = err.message;
                        console.error("Error:\n" + err)
                    }
                }
            }
        });


        divBody.appendChild(cardTitle);
        divBody.appendChild(cardText);
        divBody.appendChild(updateBtn);
        divBody.appendChild(deleteBtn);

        // adding our list item to our list
        cardDiv.appendChild(cardimg);
        cardDiv.appendChild(divBody);
        div.appendChild(cardDiv);

        id++;
    });

}

function updateCard() {
    let d = document.getElementsByClassName('updateContactId');
    let modalId = d[0].id.split(" ");
    modalId = modalId[1];

    let name = document.getElementById("updateFname").value;
    let lastName = document.getElementById("updateLast").value;
    let number = document.getElementById("updateNum").value;

    let title = document.getElementById('cardtitle ' + modalId);
    let img = document.getElementById('cardimg ' + modalId);
    let text = document.getElementById('cardtext ' + modalId);

    name = (name === "") ? title.innerText.split(' ')[0] : name;
    lastName = (lastName === "") ? title.innerText.split(' ')[1] : lastName;
    number = (number === "") ? text.innerText : number;

    let firstLetter = name.charAt(0).toLowerCase();

    document.getElementById('cardimg ' + modalId).src = "https://raw.githubusercontent.com/smontana30/Group-9/master/assets/letters/png/" + firstLetter + ".png";
    title.innerText = name + " " + lastName;
    text.innerText = number;

    try {
        let payload = JSON.stringify({
            'FirstName': name,
            'LastName': lastName,
            'Phone': number,
            'ID': modalId,
            'UserID': getUserID()
        });

        let url = "http://tinytelephonetime.ninja/api/edit_contact.php";
        let xhr = new XMLHttpRequest();
        xhr.open("POST", url, false);
        xhr.setRequestHeader("Content-type", "application/json", "charset=UTF-8");
        xhr.send(payload);
    } catch (error) {
        // If we get here, there was likely an issue with the API.
        // document.getElementById("error-tag").innerHTML = err.message;
        console.error("Error:\n" + error)
    }

    document.getElementById("updateFname").value = "";
    document.getElementById("updateLast").value = "";
    document.getElementById("updateNum").value = "";
}

function showMore() {
    currentLen += 4;
    getContacts();

}

// searches only contacts on the screen
function search() {
    let contacts = null;
    let searchBar = document.getElementById("search");
    let filter = searchBar.value.toLowerCase();
    let card = document.getElementById("card");
    let cardBody = document.getElementsByClassName("card");

    // loop throught each of our contact cards to see which to keep/remove
    for (let i = 0; i < cardBody.length; i++) {
        //console.log(cardBody[i]);
        let cardTitle = cardBody[i].getElementsByClassName('card-title')[0];
        let textContent = cardTitle.textContent;
        //console.log(textContent);
        if (textContent.toLowerCase().indexOf(filter) > -1) {
            // for filter out things if we can't find it, we get -1 as our val
            // we have a val greater then that we know it there
            cardBody[i].style.display = "";
        } else {
            // if we are here we know that card is not included in filter so hide it
            cardBody[i].style.display = "none";
        }
    }

    searchBar.addEventListener("keydown", function(event) {
        if (event.key == "Enter" || event.keycode == 13) {
            console.log("enter has been pressed");
            searchWithApi();
        }
    });
}

// searches through all contacts and loads cards for only the ones
// matching the what is on the search bar
async function searchWithApi() {
    let contacts = null;
    let object = { "results": [] }
    let searchBar = document.getElementById("search");
    let filter = searchBar.value.toLowerCase();

    if (searchBar.value == '') {
        alert("Error: Please search for a valid user");
        //getContacts();
        return;
    }

    const url = 'http://tinytelephonetime.ninja/api/get_contacts.php' + '?UserID=' + getUserID();

    // Assign contacts to the results of the url request.
    await fetch(url)
        .then(response => response.json())
        .then(results => { contacts = results })
        .catch(_error => { console.log("Error with fetching Group9 API contacts.") });

    await contacts.results.forEach(el => {
        str = el.FirstName + " " + el.LastName;
        if (str.toLowerCase().includes(filter)) {
            object.results.push(el);
        }
    });

    // Display contact cards.
    await makeContacts(object);
}

// used after creating a new contact to
// create a card for the new contact
async function getNewContact(newCon) {
    let contacts = null;
    let object = { "results": [] }

    const url = 'http://tinytelephonetime.ninja/api/get_contacts.php' + '?UserID=' + getUserID();

    // Assign contacts to the results of the url request.
    await fetch(url)
        .then(response => response.json())
        .then(results => { contacts = results })
        .catch(_error => { console.log("Error with fetching Group9 API contacts.") });

    await contacts.results.forEach(el => {
        str = el.FirstName + " " + el.LastName;
        if (str.toLowerCase().includes(newCon)) {
            object.results.push(el);
        }
    });

    // Display contact cards.
    await makeContacts(object);
}

function scrollToTop() {
    let scrollToTopBtn = document.getElementById('toTop');
    let rootEl = document.documentElement;

    rootEl.scrollTo({
        top: 0,
        behavior: "smooth"
    })
}

// Fetches the UserID from document.cookie to make API calls.
function getUserID() {
    var userId = -1;
    const data = document.cookie;
    const splits = data.split(",");

    for (var i = 0; i < splits.length; i++) {
        const s = splits[i].trim();
        const token = s.split("=");

        if (token[0] == "userId")
            userId = parseInt(token[1].trim());
    }

    // If we couldn't find the ID, redirect to login screen.
    if (userId < 0)
        window.location.href = "login.html";

    console.log("Fetched userId: " + userId);
    return userId;
}

function doLogout() {
    document.cookie = "userId=-1; expires = Thu, 01 Jan 1970 00:00:00 GMT";
    window.location.href = "login.html";
}