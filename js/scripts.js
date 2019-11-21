/* =====================================
   Public API Request
   ANIL VARMA KEERTHIPATI
======================================== */

const card = document.querySelector('.gallery');
const search = document.querySelector(".search-container");
let selectedcardId = 0;
let employees_info = [];
let activeCardIds = [];
const formSubmit = document.getElementsByTagName('form');


const searchHTML = `
    <form action="#" method="get">
         <input type="search" id="search-input" class="search-input" placeholder="Search...">
         <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
    </form>
`;

search.innerHTML = searchHTML;
formSubmit[0].addEventListener('submit', filter);
const searchText = document.getElementById('search-input');
searchText.addEventListener('keyup', filter);
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
   // console.log(activeCards);
    console.log(text);


}


fetch("https://randomuser.me/api/?nat=us&results=100")
    .then(res => res.json())
    .then(jsonData => createEmployeeCards(jsonData.results));


function createEmployeeCards(employers) {
    // console.log(employers);
    employers.forEach(employer => {
        employees_info.push(employer);
        createCard(employer);
    });
}

let i = 0;
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

card.addEventListener('click', selectedCard);

function selectedCard(e) {
    if (e.target.closest(".card")) {
        const selectedCard = e.target.closest(".card");
        selectedcardId = parseInt(selectedCard.id);
        createModal(selectedcardId);
    }
}

function createModal(selectedcardId) {
        const selectedEmployer = employees_info[selectedcardId];
        //console.log(selectedEmployer);
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

function closeModal() {
    document.getElementsByClassName('modal-container');
    const lastChild = document.body.lastChild;
    if (lastChild.className === "modal-container") {
        document.body.removeChild(document.body.lastChild);
    }
}










