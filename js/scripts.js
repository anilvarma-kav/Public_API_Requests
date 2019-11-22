/* =====================================
   Public API Request
   ANIL VARMA KEERTHIPATI
======================================== */

//Selecting the elements from document
const card = document.querySelector('.gallery');
const search = document.querySelector(".search-container");
const formSubmit = document.getElementsByTagName('form');

//Global variables to track selectedCard and activecards on screen
let selectedcardId = 0;
let employees_info = [];
let activeCardIds = [];

// To display error message on screen
function displayError(err) {
    document.querySelector('.header-text-container > h1').textContent = "Something Went Wrong, Come back later. "+ err;
}

//single fetch request to the random user API to get 12 random employees data with nationalty as US in JSON formot
fetch("https://randomuser.me/api/?nat=us&results=12")
    .then(res => res.json())
    .then(jsonData => createEmployeeCards(jsonData.results))
    .catch(err => displayError(err));

//Adding Seacrh tool
const searchHTML = `
    <form action="#" method="get">
         <input type="search" id="search-input" class="search-input" placeholder="Search...">
         <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
    </form>
`;
search.innerHTML = searchHTML;

// Search tool works even if a key is pressed and also if a form is submitted.
formSubmit[0].addEventListener('submit', filter);
const searchText = document.getElementById('search-input');
searchText.addEventListener('keyup', filter);

/**
 * Used to filter the employee cards on screen based on the text entered in search field.
 */
function filter() {
    const text = searchText.value.toLowerCase();
    const activeCards = document.querySelectorAll('.card-name');
    activeCardIds = [];
    activeCards.forEach(activeCard => {
        const name = activeCard.textContent.toLowerCase();
        let parentDiv = activeCard.closest('.card');
        if(name.includes(text)){
            console.log(parentDiv);
            parentDiv.style.display = "";
            activeCardIds.push(parentDiv.id);
        }
        else{
            parentDiv.style.display = "none";
        }
    });
}


//Creating employee cards by passing each employee object to creatCard() function and also employee object to employees_info[] array
function createEmployeeCards(employers) {
    employers.forEach(employer => {
        employees_info.push(employer);
        createCard(employer);
    });
}

// Using i variable to add id's each employee card. These id's will be used for navigation of employee cards
let i = 0;

//createCard(employer) creates a card for employer
function createCard(employer) {
    let childdiv = document.createElement('div');
    childdiv.className = "card";
    childdiv.id = i.toString();
    activeCardIds.push(childdiv.id);
    i += 1;
    const html = `
               <div class="card-img-container">
                    <img class="card-img" src="${employer.picture.large}" alt="profile picture">
                </div>
             <div class="card-info-container">
            <h3 id="name" class="card-name cap">${employer.name.first} ${employer.name.last}</h3>
        <p class="card-text">${employer.email}</p>
            <p class="card-text cap">${employer.location.city}, ${employer.location.state}</p>
        </div> 
        `;
        childdiv.innerHTML = html;
        card.append(childdiv);
}

//If any part of the card clicked selectdCard() function will be called
card.addEventListener('click', selectedCard);

//Gets the ID of the clicked card div and sends it to createModal() function
function selectedCard(e) {
    if (e.target.closest(".card")) {
        const selectedCard = e.target.closest(".card");
        selectedcardId = parseInt(selectedCard.id);
        createModal(selectedcardId);
    }
}

// Creates the modal for the selected employee
function createModal(selectedcardId) {
        const selectedEmployer = employees_info[selectedcardId];
        let childdiv = document.createElement('div');
        childdiv.className = "modal-container";
        const dob = new Date(selectedEmployer.dob.date);
        const html = `
        <div class="modal">
                    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                    <div class="modal-info-container">
                        <img class="modal-img" src="${selectedEmployer.picture.large}" alt="profile picture">
                        <h3 id="name" class="modal-name cap">${selectedEmployer.name.first} ${selectedEmployer.name.last}</h3>
                        <p class="modal-text">${selectedEmployer.email}</p>
                        <p class="modal-text cap">${selectedEmployer.location.city}, ${selectedEmployer.location.state}</p>
                        <hr>
                        <p class="modal-text">${selectedEmployer.phone}</p>
                        <p class="modal-text">${selectedEmployer.location.street.number} ${selectedEmployer.location.street.name}, ${selectedEmployer.location.city} , ${selectedEmployer.location.state} ${selectedEmployer.location.postcode}</p>
                        <p class="modal-text">Birthday: ${dob.getMonth() + 1}/${dob.getDate()}/${dob.getFullYear()}</p>
                    </div>
                </div>
                <div class="modal-btn-container">
                    <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                    <button type="button" id="modal-next" class="modal-next btn">Next</button>
                </div>
    `;
        childdiv.innerHTML = html;
        document.body.appendChild(childdiv);
}

// continuosly listen's for clicks in the document if next button is clicked nextCard() will be called
// prevCard() will be called if prevbutton is clicked
//'X' is clicked modal window will be closed

document.addEventListener('click', function (e) {
   // console.log(e.target);
    if(e.target.id === 'modal-close-btn' || e.target.textContent === 'X'){
        closeModal();
    }
    if(e.target.id === "modal-next"){
        nextCard();
    }
    if(e.target.id === "modal-prev"){
        prevCard();
    }


});

//displays next active employee card on screen. If there is no next employee card then next button will disappear from modal window
function nextCard() {
    const nextButton = document.getElementById('modal-next');
    let index = activeCardIds.indexOf(selectedcardId.toString()) +1;
    if(index<activeCardIds.length){
        closeModal();
        selectedcardId = parseInt(activeCardIds[index]);
        createModal(selectedcardId);
    }
    else{
        nextButton.style.display = 'none';
    }

}

//displays previous active employee card on screen. If there is no previous employee card then prev button will disappear from modal window
function prevCard() {
    const prevButton = document.getElementById('modal-prev');
    let index = activeCardIds.indexOf(selectedcardId.toString()) - 1;
    if(index >= 0){
        closeModal();
        selectedcardId = parseInt(activeCardIds[index]);
        createModal(selectedcardId);
    }
    else{
        prevButton.style.display = 'none';
    }
}

//To close the modal window by deleting modal-container from html
function closeModal() {
    document.getElementsByClassName('modal-container');
    const lastChild = document.body.lastChild;
    if (lastChild.className === "modal-container") {
        document.body.removeChild(document.body.lastChild);
    }
}










