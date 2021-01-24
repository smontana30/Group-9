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

const li = document.getElementsByClassName("id")

