
function addContact() {
    const ulEl = document.getElementById('contact-list');
    let listEl = document.createElement('li');
    listEl.appendChild(document.createTextNode("test"));
    ulEl.appendChild(listEl);
}