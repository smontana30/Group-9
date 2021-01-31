// You can specify which plugins you need

function createContact() {
    
    // getting out list element
    let ulEl = document.getElementById('contact-list');

    // creating list item and giving it bootstrap class
    let listEl = document.createElement("li");
    let aref = document.createElement('a');
    listEl.classList.add("list-group-item");


    // getting our inputs
    let firstName = document.getElementById('firstName').value;
    let lastName = document.getElementById('lastName').value;
    let phoneNum = document.getElementById('phone-number').value;

    // adding our input t our list item
    
    listEl.appendChild(document.createTextNode(firstName + " " + lastName + ": " + phoneNum));
    let updateBtn = document.createElement('button');
    updateBtn.textContent = "Update";
    updateBtn.setAttribute('class', "btn btn-secondary");
    updateBtn.setAttribute('data-bs-toggle', "modal");
    updateBtn.setAttribute('data-bs-target', "#myModal2");

    let deleteBtn = document.createElement('button');
    deleteBtn.textContent = "Delete";
    deleteBtn.setAttribute('class', "btn btn-secondary");

    // resetting inputs
    document.getElementById('firstName').value = "";
    document.getElementById('lastName').value = "";
    document.getElementById('phone-number').value = "";

    listEl.appendChild(updateBtn);
    listEl.appendChild(deleteBtn);

    // adding our list item to our list
    ulEl.appendChild(listEl);


}

async function getContacts() {
    let contacts;

    await fetch('https://pokeapi.co/api/v2/pokemon?limit=100&offset=200')
    .then(response => response.json())
    .then(results => {contacts = results})
    .catch(error => {console.log("Oh no, Error")});

    await makeContacts(contacts)
}

async function makeContacts(contacts) {
    // getting out list element
    let ulEl = document.getElementById('contact-list');

    await console.log(contacts)
    // creating list item and giving it bootstrap class
   
   
    contacts.results.forEach(el => {
        console.log(el);

        let listEl = document.createElement("li");
        let aref = document.createElement('a');
        listEl.classList.add("list-group-item");

         // getting our inputs
        let fName = el.name;
        // let lName = document.getElementById('lastName').value;
        // let number = document.getElementById('phone-number').value;

        // adding our input t our list item
        
        listEl.appendChild(document.createTextNode(fName));
        let updateBtn = document.createElement('button');
        updateBtn.textContent = "Update";
        updateBtn.setAttribute('class', "btn btn-secondary");
        updateBtn.setAttribute('data-bs-toggle', "modal");
        updateBtn.setAttribute('data-bs-target', "#myModal2");

        let deleteBtn = document.createElement('button');
        deleteBtn.textContent = "Delete";
        deleteBtn.setAttribute('class', "btn btn-secondary");

        listEl.appendChild(updateBtn);
        listEl.appendChild(deleteBtn);

        // adding our list item to our list
        ulEl.appendChild(listEl);
    });
}


const li = document.getElementsByClassName("id")

