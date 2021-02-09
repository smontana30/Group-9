// You can specify which plugins you need

function createContact() {

    // // getting out list element
    let div = document.getElementById('card');

    // // creating list item and giving it bootstrap class
    // let listEl = document.createElement("li");
    // let aref = document.createElement('a');
    // listEl.classList.add("list-group-item");


    // // getting our inputs
    let firstName = document.getElementById('firstName').value;
    let lastName = document.getElementById('lastName').value;
    // Create a function to remove any non-digits from the phone number.
    let phoneNum = document.getElementById('phone-number').value;
    let userId = getUserID()

    let payload = JSON.stringify({'FirstName': firstName, 'LastName': lastName,
        'Phone': phoneNum, 'UserID': userId});
    let url = "http://68.183.59.220/api/add_contact.php";
    let xhr = new XMLHttpRequest();
    console.log("sending " + payload + " to get_contacts.php");
    xhr.open("POST", url, false);
    xhr.setRequestHeader("Content-type", "application/json", "charset=UTF-8");
    xhr.send(payload);

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

    // // adding our input t our list item

    // listEl.appendChild(document.createTextNode(firstName + " " + lastName + ": " + phoneNum));
    // let updateBtn = document.createElement('button');
    // updateBtn.textContent = "Update";
    // updateBtn.setAttribute('class', "btn btn-secondary");
    // updateBtn.setAttribute('data-bs-toggle', "modal");
    // updateBtn.setAttribute('data-bs-target', "#myModal2");

    // let deleteBtn = document.createElement('button');
    // deleteBtn.textContent = "Delete";
    // deleteBtn.setAttribute('class', "btn btn-secondary");

    // // resetting inputs
    document.getElementById('firstName').value = "";
    document.getElementById('lastName').value = "";
    document.getElementById('phone-number').value = "";

    // listEl.appendChild(updateBtn);
    // listEl.appendChild(deleteBtn);

    // // adding our list item to our list
    // ulEl.appendChild(listEl);


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

    // // resetting inputs
    document.getElementById('firstName').value = "";
    document.getElementById('lastName').value = "";
    document.getElementById('phone-number').value = "";
}

async function getContacts() {
    let contacts;
    let userid = getUserID();
    console.log("User id: ", userid);

    // group api query
    // 'http://68.183.59.220/api/get_contacts.php?UserID=' + userid
    await fetch('https://pokeapi.co/api/v2/pokemon?limit=100&offset=200')
        .then(response => response.json())
        .then(results => { contacts = results })
        .catch(error => { console.log("Oh no, Error") });

    await makeContacts(contacts)
}

// async function makeContacts(contacts) {
//     // getting out list element
//     let ulEl = document.getElementById('contact-list');

//     await console.log(contacts)
//     // creating list item and giving it bootstrap class


//     contacts.results.forEach(el => {
//         console.log(el);

//         let listEl = document.createElement("li");
//         let aref = document.createElement('a');
//         listEl.classList.add("list-group-item");

//          // getting our inputs
//         let fName = el.name;
//         // let lName = document.getElementById('lastName').value;
//         // let number = document.getElementById('phone-number').value;

//         // adding our input t our list item

//         listEl.appendChild(document.createTextNode(fName));
//         let updateBtn = document.createElement('button');
//         updateBtn.textContent = "Update";
//         updateBtn.setAttribute('class', "btn btn-secondary");
//         updateBtn.setAttribute('data-bs-toggle', "modal");
//         updateBtn.setAttribute('data-bs-target', "#myModal2");

//         let deleteBtn = document.createElement('button');
//         deleteBtn.textContent = "Delete";
//         deleteBtn.setAttribute('class', "btn btn-secondary");

//         listEl.appendChild(updateBtn);
//         listEl.appendChild(deleteBtn);

//         // adding our list item to our list
//         ulEl.appendChild(listEl);
//     });
// }
async function makeContacts(contacts) {
    // getting out list element
    let div = document.getElementById('card');

    await console.log(contacts)
        // creating list item and giving it bootstrap class
    let flag = 0;

    contacts.results.forEach(el => {
        console.log(el);
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
        // let fName = el.FirstName;
        let fName = el.name;
        // attempting to add image but it wasn't working and i got frustated 
        let firLetter = fName.toLowerCase().charAt(0);
        // let src = "/letters/png/" + firLetter + ".png";
        // console.log(src);
        cardimg.src = "https://raw.githubusercontent.com/smontana30/Group-9/master/assets/letters/png/" + firLetter + ".png";
        // cardimg.style.backgroundImage = "url('../images/letters/png/ " + firLetter +".png')";
        // cardimg.alt = 'Nothing'
        let lName = el.LastName;
        let number = el.Phone;
        if (lName == undefined || number == undefined) {
            lName = "test";
            number = "123456789";
        }
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
        flag++;
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
        console.log(cardBody[i]);
        let cardTitle = cardBody[i].getElementsByClassName('card-title')[0];
        let textContent = cardTitle.textContent;
        console.log(textContent);
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

// search the user contacts for given strings
function searchApi() {
    // used the search string given "unown" 
}

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

    // if (userId < 0)
    //     window.location.href = "login.html";
    return userId;
}

const li = document.getElementsByClassName("id")