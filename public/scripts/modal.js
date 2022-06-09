// selects create account modal
const openModalBtn = document.querySelector(".open-modal");
const closeModalBtn = document.querySelector(".close-modal");

// selects result of create account modal
const openResultBtn = document.querySelector(".open-result-modal");
const closeResultModalBtns = [document.querySelector(".result-ok"), document.querySelector(".result-no")];

// selects password account modal
const [...openPasswordAccountBtns] = document.querySelectorAll(".password-card-btn");
const [...closePasswordAccountBtns] = document.querySelectorAll(".close-password-account-modal");

// selects result of password account modal
const [...openPasswordResultBtns] = document.querySelectorAll(".open-password-result-modal");

// selects overlay for all modals
const overlay = document.querySelector("#overlay");
const resultOverlay = document.querySelector("#result-overlay");



// opens modal for creating password account
openModalBtn.addEventListener("click", function() {
    const modal = document.querySelector(".modal");
    openModal(modal);
});

// opens result modal when attempting to create password account
openResultBtn.addEventListener("click", function(event) {
    event.preventDefault();
    const resultModal = document.querySelector(".result-modal");
    openResultModal(resultModal);
});

// opens detailed information when password button of password card gets clicked
openPasswordAccountBtns.map(function(item, index) {
    item.addEventListener("click", function() {
        const passwordAccountModal = document.querySelectorAll(".password-account-modal")[index];
        const passwordAccountOverlay = document.querySelectorAll("#password-account-overlay")[index];
        openPasswordAccountModal(passwordAccountModal, passwordAccountOverlay);
    });  
});

// opens result modal of password card when it's save button is clicked
openPasswordResultBtns.map(function(item, index) {
    item.addEventListener("click", function() {
        const passwordResultModal = document.querySelectorAll(".password-result-modal")[index];
        const passwordResultOverlay = document.querySelectorAll("#password-result-overlay")[index];
        openPasswordResultModal(passwordResultModal, passwordResultOverlay);
    });
});



// close button for modal of creating password account
closeModalBtn.addEventListener("click", function() {
    const modal = document.querySelector(".modal");
    closeModal(modal);
});

// when clicking the options of the result modal from creating a password account 
closeResultModalBtns.map(function(item) {
    const resultModal = document.querySelector(".result-modal");
    item.addEventListener("click", function() {
        closeResultModal(resultModal);
    });
});

// close button for when password button is clicked on password card
closePasswordAccountBtns.map(function(item, index) {
    item.addEventListener("click", function() {
        const passwordAccountModal = document.querySelectorAll(".password-account-modal")[index];
        const passwordAccountOverlay = document.querySelectorAll("#password-account-overlay")[index];
        closePasswordAccountModal(passwordAccountModal, passwordAccountOverlay);
    });
});

function openModal(modal) {
    modal.classList.add("active");
    overlay.classList.add("active");    
}
function openResultModal(resultModal) {
    resultModal.classList.add("active");
    resultOverlay.classList.add("active");
}
function openPasswordAccountModal(passwordAccountModal, passwordAccountOverlay) {
    passwordAccountModal.classList.add("active");
    passwordAccountOverlay.classList.add("active");   
}
function openPasswordResultModal(passwordResultModal, passwordResultOverlay) {
    passwordResultModal.classList.add("active");
    passwordResultOverlay.classList.add("active");
}

function closeModal(modal) {
    modal.classList.remove("active");
    overlay.classList.remove("active");
}
function closeResultModal(resultModal) {
    resultModal.classList.remove("active");
    resultOverlay.classList.remove("active");
}
function closePasswordAccountModal(passwordAccountModal, passwordAccountOverlay) {
    passwordAccountModal.classList.remove("active");
    passwordAccountOverlay.classList.remove("active");
}