let offset = 0; // For selecting previous/next couple of contacts.
let id = 0;
const length = 12; // Number of contacts to show on the screen.
const li = document.getElementsByClassName("id")

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
        let url = "http://68.183.59.220/api/add_contact.php";
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
        // here will an event listner for click and send data to update card
        // will probaby send first and last name and phone number to update to search for 
        // card to update. then use flag to let us know if we need to update the card.
        let deleteBtn = document.getElementById('modal3delete');

        deleteBtn.addEventListener('click', function() {
            let num = id.toString();
            console.log("id of card is: " + num);
            // let card1 = document.getElementById('1');
            // card1.remove();
            let cards = document.getElementsByClassName("card");
            console.log(cards.length);
            // search for fname lname to know which card to delete
            for (let i = 0; i < cards.length; i++) {
                let cardTitle = cards[i].getElementsByClassName('card-title')[0];
                let textContent = cardTitle.textContent;
                let str = firstName + " " + lastName;
                if (textContent.match(str)) {
                    cards[i].remove();
                }
            }
        });

        id++;
    });

    divBody.appendChild(cardTitle);
    divBody.appendChild(cardText);

    // divBody.appendChild(updateBtn);
    // divBody.appendChild(deleteBtn);

    // adding our list item to our list
    cardDiv.appendChild(cardimg);
    cardDiv.appendChild(divBody);
    div.appendChild(cardDiv);

    // // resetting inputs
    document.getElementById('firstName').value = "";
    document.getElementById('lastName').value = "";
    document.getElementById('phone-number').value = "";

    // listEl.appendChild(updateBtn);
    // listEl.appendChild(deleteBtn);

    // // adding our list item to our list
    // ulEl.appendChild(listEl);

}

function deleteContact(deleteCard) {
    let parentDiv = document.getElementById('card');
    parentDiv.removeChild(deleteCard);
    
}

function updateCard() {
    // // getting out list element
    let div = document.getElementById('card');

    // // creating list item and giving it bootstrap class
    // let listEl = document.createElement("li");
    // let aref = document.createElement('a');
    // listEl.classList.add("list-group-item");


    // // getting our inputs
    let firstName = document.getElementById('firstName').value;
    let lastName = document.getElementById('lastName').value;
    let phoneNum = document.getElementById('phone-number').value;

    let divBody = document.createElement("div");
    divBody.setAttribute('class', "card-body");

    // let cardimg = document.createElement('img');
    // cardimg.setAttribute('class', 'card-img-top');

    let cardTitle = document.createElement('h5');
    cardTitle.setAttribute('class', "card-title");

    let cardText = document.createElement('h6');
    cardText.setAttribute('class', 'card-text');

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
    cardDiv.style.width = '14rem';
    cardDiv.style.height = '10rem';

    divBody.appendChild(cardTitle);
    divBody.appendChild(cardText);
    divBody.appendChild(updateBtn);
    divBody.appendChild(deleteBtn);

    // adding our list item to our list
    // cardDiv.appendChild(cardimg);
    cardDiv.appendChild(divBody);
    div.appendChild(cardDiv);

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
        // here will an event listner for click and send data to update card
        // will probaby send first and last name and phone number to update to search for 
        // card to update. then use flag to let us know if we need to update the card.
        let deleteBtn = document.getElementById('modal3delete');

        deleteBtn.addEventListener('click', function() {
            // let num = id.toString();
            // console.log("id of card is: " + num);
            // let card1 = document.getElementById('1');
            // card1.remove();
            let cards = document.getElementsByClassName("card");
            console.log(cards.length);
            // search for fname lname to know which card to delete
            for (let i = 0; i < cards.length; i++) {
                let cardTitle = cards[i].getElementsByClassName('card-title')[0];
                let textContent = cardTitle.textContent;
                let str = fName + " " + lName;
                if (textContent.match(str)) {
                    cards[i].remove();
                }
            }
        });
    });

    // // resetting inputs
    document.getElementById('firstName').value = "";
    document.getElementById('lastName').value = "";
    document.getElementById('phone-number').value = "";
}

// Function called to send a POST request to the API and display contact cards
// to the screen, omitting the query parameter.
async function getContacts() {
    const url_online = 'http://68.183.59.220/api/get_contacts.php';

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
    let cards = document.getElementsByClassName("card");
    let parentCard = document.getElementById("card");
    let searchBar = document.getElementById("search");
    const url = 'http://68.183.59.220/api/get_contacts.php';

    // URL Parameters:
    // - UserID: The unique ID of the currently logged in user, stored in a cookie.
    // - length: The number of contacts to return.
    // - offset: Number of contacts to skip in the array being returned.
    // - query : Search string applied to each individual column of the database.
    
    const params = '?UserID=' + getUserID() + '&length=' + length + '&offset=' + offset + '&query=' + searchBar.value;

    // !!!!!!!!!!!!!!!!!!!!!!!!!!!
    // These lines throw the error:
    //      Uncaught (in promise) TypeError: 
    //      Failed to execute 'removeChild' on 'Node': parameter 1 is not of type 'Node'.
    // parentCard.removeChild(cards);
    // await cards.remove();
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!
    
    // If someone attempts to query an empty string, return all the contacts.
    if (searchBar.value == '') {
        getContacts();
        return;
    }
    
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
        if (flag == 12)
            return;

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

        cardTitle.appendChild(document.createTextNode(fName + " " + lName));
        cardText.appendChild(document.createTextNode(number));


        // let updateBtn = document.createElement('button');
        // updateBtn.textContent = "Update";
        // updateBtn.setAttribute('class', "btn btn-secondary");
        // updateBtn.setAttribute('data-bs-toggle', "modal");
        // updateBtn.setAttribute('data-bs-target', "#myModal2");

        // let deleteBtn = document.createElement('button');
        // deleteBtn.textContent = "Delete";
        // deleteBtn.setAttribute('class', "btn btn-secondary");

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

            let deleteBtn = document.getElementById('modal3delete');
            deleteBtn.addEventListener('click', function() {
                // let num = id.toString();
                // console.log("id of card is: " + num);
                // let card1 = document.getElementById('1');
                // card1.remove();
                let cards = document.getElementsByClassName("card");
                console.log(cards.length);
                // search for fname lname to know which card to delete
                for (let i = 0; i < cards.length; i++) {
                    let cardTitle = cards[i].getElementsByClassName('card-title')[0];
                    let textContent = cardTitle.textContent;
                    let str = fName + " " + lName;
                    if (textContent.match(str)) {
                        cards[i].remove();
                    }
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
    // if (userId < 0)
    //     window.location.href = "login.html";
    // console.log("Fetched userId: " + userId);
    return userId;
}

function doLogout()
{
    document.cookie = "userId=-1; expires = Thu, 01 Jan 1970 00:00:00 GMT";
    window.location.href = "login.html";
}
