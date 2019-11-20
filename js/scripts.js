const card = document.querySelector('.gallery');
let selectedcardId = 0;
const employees_info = [];
//const model_container = document.querySelector('.modal-container');
let i =0 ;

function createCard(employer) {
    let childdiv = document.createElement('div');
    childdiv.className = "card";
    childdiv.id = i.toString();
    i+=1;
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
                        <p class="modal-text">Birthday: ${dob.getMonth()+1}/${dob.getDate()}/${dob.getFullYear()}</p>
                    </div>
                </div>
    `;
    childdiv.innerHTML = html;
    document.body.appendChild(childdiv);

}

function selectedCard(e) {
    const cardDivs = document.querySelectorAll('.card');
    //console.log(cardDivs.length);
    if(e.target.closest(".card")){
        //console.log(e.target.closest(".card"));
        const selectedCard = e.target.closest(".card");
        selectedcardId = parseInt(selectedCard.id);
        //console.log(selectedcardId);
        createModal(selectedcardId);
        const close = document.getElementById('modal-close-btn');
        close.addEventListener('click', closeModal);
    }
}

function createEmployeeCards(employers) {
   // console.log(employers);
    employers.forEach(employer =>{
        employees_info.push(employer);
        createCard(employer);
    });
}

function closeModal() {
    //console.log("closed");
    const modalContainer = document.getElementsByClassName('modal-container');
    modalContainer.rem
    const lastChild = document.body.lastChild;
    if(lastChild.className === "modal-container"){
        document.body.removeChild(document.body.lastChild);
    }
}

fetch("https://randomuser.me/api/?nat=us&results=12")
    .then(res => res.json())
    .then(jsonData => createEmployeeCards(jsonData.results));


card.addEventListener('click', selectedCard);




