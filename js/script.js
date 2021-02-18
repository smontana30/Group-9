let offset = 0; // For selecting previous/next couple of contacts.
let id = 0;
const length = 12; // Number of contacts to show on the screen.

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
        console.error("Error:\n" + err)
    }

    let divBody = document.createElement("div");
    divBody.setAttribute('class', "card-body");

    let cardimg = document.createElement('img');
    cardimg.setAttribute('class', 'card-img-top');

    let cardTitle = document.createElement('h5');
    cardTitle.setAttribute('class', "card-title");

    let cardText = document.createElement('h6');
    cardText.setAttribute('class', 'card-text');

    let firLetter = firstName.toLowerCase().charAt(0);
    // let src = "/letters/png/" + firLetter + ".png";
    // console.log(src);
    cardimg.src = "https://raw.githubusercontent.com/smontana30/Group-9/master/assets/letters/png/" + firLetter + ".png";
    // cardimg.style.backgroundImage = "url('../images/letters/png/ " + firLetter +".png')";

    // adding our input our list item  
    cardTitle.appendChild(document.createTextNode(firstName + " " + lastName));
    cardText.appendChild(document.createTextNode(phoneNum));


    let updateBtn = document.createElement('button');
    updateBtn.textContent = "Update";
    updateBtn.setAttribute('class', "btn btn-secondary");
    updateBtn.setAttribute('data-bs-toggle', "modal");
    updateBtn.setAttribute('data-bs-target', "#myModal2");

    let deleteBtn = document.createElement('button');
    deleteBtn.textContent = "Delete";
    deleteBtn.setAttribute('class', "btn btn-secondary");

    let cardDiv = document.createElement("div");
    cardDiv.setAttribute('class', "card");
    cardDiv.setAttribute('id', id);
    
    cardDiv.addEventListener('click', function() {
        this.setAttribute('data-bs-toggle', 'modal');
        this.setAttribute('data-bs-target', '#myModal3');
        let modal = document.getElementById('modal3');
        let modalname = document.getElementById('fullName');
        let modalphone = document.getElementById('phNumber');
        modalname.textContent = "Name: " + firstName + " " + lastName;
        modalphone.innerText = "Phone: " + phoneNum;
        let updateBtn = document.getElementById('modal3button');
        updateBtn.setAttribute('data-bs-toggle', "modal");
        updateBtn.setAttribute('data-bs-target', "#myModal2");

        updateBtn.addEventListener('click', function() {
            let update = document.getElementById('updateBtn');
            update.addEventListener('click', function() {
                let cards = document.getElementsByClassName("card");
                let updateFName = document.getElementById('updateFname').value;
                let updateLName = document.getElementById('updateLast').value;
                let updateNum = document.getElementById('updateNum').value;
                let updateId;
                for (let i = 0; i < cards.length; i++) {
                    let cardTitle = cards[i].getElementsByClassName('card-title')[0];
                    let cardText = cards[i].getElementsByClassName('card-text')[0];
                    let cardimg = cards[i].getElementsByClassName('card-img-top')[0];
                    let textContent = cardTitle.textContent;
                    let searchedCard = firstName + " " + lastName;
                    if (textContent.match(searchedCard)) {
                        let title = updateFName + " " + updateLName;
                        let text = updateNum;
                        updateId = cards[i].id;
                        cardTitle.innerText = title;
                        cardText.innerText = text;
                        let letter = updateFName.toLowerCase().charAt(0);
                        cardimg.src = "https://raw.githubusercontent.com/smontana30/Group-9/master/assets/letters/png/" + letter + ".png";
                    }
                }
                try {
                    let payload = JSON.stringify({
                        'FirstName': updateFName,
                        'LastName': updateLName,
                        'Phone': updateNum,
                        'ID': updateId,
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
                    console.error("Error:\n" + err)
                }
            })

            document.getElementById('updateFname').value = "";
            document.getElementById('updateLast').value = "";
            document.getElementById('updateNum').value = "";
            
        });

        let deleteBtn = document.getElementById('modal3delete');

        deleteBtn.addEventListener('click', function() {
            let num = id.toString();
            console.log("id of card is: " + num);
            // let card1 = document.getElementById('1');
            // card1.remove();
            let cards = document.getElementsByClassName("card");
            console.log(cards.length);
            let updateId = 0;
            // search for fname lname to know which card to delete
            for (let i = 0; i < cards.length; i++) {
                let cardTitle = cards[i].getElementsByClassName('card-title')[0];
                let textContent = cardTitle.textContent;
                let str = firstName + " " + lastName;
                if (textContent.match(str)) {
                    updateId = cards[i].id;
                    cards[i].remove();
                }
            }
            
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
        });

        id++;
    });

    divBody.appendChild(cardTitle);
    divBody.appendChild(cardText);

    // adding our list item to our list
    cardDiv.appendChild(cardimg);
    cardDiv.appendChild(divBody);
    div.appendChild(cardDiv);

    // // resetting inputs
    document.getElementById('firstName').value = "";
    document.getElementById('lastName').value = "";
    document.getElementById('phone-number').value = "";

}

// Function called to send a POST request to the API and display contact cards
// to the screen, omitting the query parameter.
async function getContacts() {
    const url_online = 'http://tinytelephonetime.ninja/api/get_contacts.php';

    // URL Parameters:
    // - UserID: The unique ID of the currently logged in user, stored in a cookie.
    // - length: The number of contacts to return.
    // - offset: Number of contacts to skip in the array being returned.

    const params = '?UserID=' + getUserID() + '&length=' + length + '&offset=' + offset;
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
        getContacts();
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
    const url_offline = 'https://pokeapi.co/api/v2/pokemon?limit=' + length + '&offset=' + offset;

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

    // Display contact cards.
    await makeContacts(contacts);
}

async function makeContacts(contacts) {
    // getting out list element
    let div = document.getElementById('card');

    //console.log(contacts)
        // creating list item and giving it bootstrap class
    let flag = 0;
    
    contacts.results.forEach(el => {
        //console.log(el);
        // if (flag == 12)
        //     return;

        let divBody = document.createElement("div");
        divBody.setAttribute('class', "card-body");

        let cardimg = document.createElement('img');
        cardimg.setAttribute('class', 'card-img-top');

        let cardTitle = document.createElement('h5');
        cardTitle.setAttribute('class', "card-title");

        let cardText = document.createElement('h6');
        cardText.setAttribute('class', 'card-text');

        // getting our inputs
        let fName = el.name == undefined ? el.FirstName : el.name;

        // attempting to add image but it wasn't working and i got frustated 
        let firLetter = fName.toLowerCase().charAt(0);
        // let src = "/letters/png/" + firLetter + ".png";
        // console.log(src);
        cardimg.src = "https://raw.githubusercontent.com/smontana30/Group-9/master/assets/letters/png/" + firLetter + ".png";
        // cardimg.style.backgroundImage = "url('../images/letters/png/ " + firLetter +".png')";
        // cardimg.alt = 'Nothing'
        let lName = el.LastName == undefined ? "lastname" : el.LastName;
        let number = el.Phone == undefined ? "1231231234" : el.Phone;

        // Changing the card ID to be the contact ID to allow for easier deletion and editing.
        id = el.ID == undefined ? id : el.ID;
        // adding our input our list item


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
        cardDiv.setAttribute('id', el.id);
        // cardDiv.style.width = '14rem';
        // cardDiv.style.height = '10rem';

        cardDiv.addEventListener('click', function() {
            this.setAttribute('data-bs-toggle', 'modal');
            this.setAttribute('data-bs-target', '#myModal3');
            let modal = document.getElementById('modal3');
            let modalname = document.getElementById('fullName');
            let modalphone = document.getElementById('phNumber');
            modalname.textContent = "Name: " + fName + " " + lName;
            modalphone.innerText = "Phone: " + number;
            let updateBtn = document.getElementById('modal3button');
            updateBtn.setAttribute('data-bs-toggle', "modal");
            updateBtn.setAttribute('data-bs-target', "#myModal2");

            updateBtn.addEventListener('click', function() {
                let update = document.getElementById('updateBtn');
                update.addEventListener('click', function() {
                    let cards = document.getElementsByClassName("card");
                    let updateFName = document.getElementById('updateFname').value;
                    let updateLName = document.getElementById('updateLast').value;
                    let updateNum = document.getElementById('updateNum').value;
                    
                    let updateId;
                    for (let i = 0; i < cards.length; i++) {
                        let cardTitle = cards[i].getElementsByClassName('card-title')[0];
                        let cardText = cards[i].getElementsByClassName('card-text')[0];
                        let cardimg = cards[i].getElementsByClassName('card-img-top')[0];
                        let textContent = cardTitle.textContent;
                        let searchedCard = fName + " " + lName;
                        if (textContent.match(searchedCard)) {
                            let title = updateFName + " " + updateLName;
                            let text = updateNum;
                            updateId = cards[i].id;
                            cardTitle.innerText = title;
                            cardText.innerText = text;
                            let letter = updateFName.toLowerCase().charAt(0);
                            cardimg.src = "https://raw.githubusercontent.com/smontana30/Group-9/master/assets/letters/png/" + letter + ".png";
                        }
                    }
                });

                try {
                    let payload = JSON.stringify({
                        'FirstName': updateFName,
                        'LastName': updateLName,
                        'Phone': updateNum,
                        'ID': updateId,
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
                    console.error("Error:\n" + err)
                }

                document.getElementById('updateFname').value = "";
                document.getElementById('updateLast').value = "";
                document.getElementById('updateNum').value = "";
                
            });

            let deleteBtn = document.getElementById('modal3delete');
            deleteBtn.addEventListener('click', function() {
                // let num = id.toString();
                // console.log("id of card is: " + num);
                // let card1 = document.getElementById('1');
                // card1.remove();
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
                    }
                }

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
            });
            // here will an event listner for click and send data to update card
            // will probaby send first and last name and phone number to update to search for 
            // card to update. then use flag to let us know if we need to update the card.

        });
        

        divBody.appendChild(cardTitle);
        divBody.appendChild(cardText);
        // divBody.appendChild(updateBtn);
        // divBody.appendChild(deleteBtn);

        // adding our list item to our list
        cardDiv.appendChild(cardimg);
        cardDiv.appendChild(divBody);
        div.appendChild(cardDiv);
        
        //console.log(cardDiv);

        flag++;
        id++;
    });
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
}

// searches through all contacts and loads cards for only the ones
// matching the what is on the search bar
// STILL IN PROGRESS - DOESN'T WORK YET
async function searchWithApi() {
    let contacts = null;
    let filteredContacts = {};
    let object = {"results":[]}
    let searchBar = document.getElementById("search");
    let filter = searchBar.value.toLowerCase();

    const url = 'http://tinytelephonetime.ninja/api/get_contacts.php' + '?UserID=' + getUserID();

    // Assign contacts to the results of the url request.
    await fetch(url)
        .then(response => response.json())
        .then(results => { contacts = results })
        .catch(_error => { console.log("Error with fetching Group9 API contacts.") });
    
    await console.log("About to enter for each loop");
    await contacts.results.forEach(el => {
        console.log("Inside loop");
        console.log(filter);
        str = el.FirstName + " " + el.LastName;
        console.log(str);

        if (str.toLowerCase().includes(filter)) {
            console.log("Inside If");
            object.results.push(el);
            //filteredContacts.push(object.results);
            console.log(object);
            //console.log(filteredContacts);
        }
    });

    await console.log(object);
    //await console.log(filteredContacts);
    // Display contact cards.
    await makeContacts(object);
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

function doLogout()
{
    document.cookie = "userId=-1; expires = Thu, 01 Jan 1970 00:00:00 GMT";
    window.location.href = "login.html";
}
