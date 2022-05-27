// selects create account modal
const openModalBtn = document.querySelector(".open-modal");
const closeModalBtn = document.querySelector(".close-modal");

// selects result of create account modal
const openResultBtn = document.querySelector(".open-result-modal");
const closeResultOkBtn = document.querySelector(".result-ok");
const closeResultNoBtn = document.querySelector(".result-no");

const closeResultModalBtns = [closeResultOkBtn, closeResultNoBtn];

// selects password account modal
const [...openPasswordAccountBtns] = document.querySelectorAll(".password-card-btn");
const [...closePasswordAccountBtns] = document.querySelectorAll(".close-password-account-modal");

// selects overlay for all modals
const overlay = document.querySelector("#overlay");
const resultOverlay = document.querySelector("#result-overlay");
const passwordAccountOverlay = document.querySelector("#password-account-overlay");

openModalBtn.addEventListener("click", function() {
    const modal = document.querySelector(".modal");
    openModal(modal);
});
openResultBtn.addEventListener("click", function(event) {
    event.preventDefault();
    const resultModal = document.querySelector(".result-modal");
    openResultModal(resultModal);
});
openPasswordAccountBtns.map(function(item) {
    item.addEventListener("click", function() {
        const buttonIndex = openPasswordAccountBtns.indexOf(item);
        const passwordAccountModal = document.querySelectorAll(".password-account-modal")[buttonIndex];
        openPasswordAccountModal(passwordAccountModal);
    });  
})

closeModalBtn.addEventListener("click", function() {
    const modal = document.querySelector(".modal");
    closeModal(modal);
});
closeResultModalBtns.map(function(item) {
    const resultModal = document.querySelector(".result-modal");
    item.addEventListener("click", function() {
        closeResultModal(resultModal);
    });
});
closePasswordAccountBtns.map(function(item) {
    item.addEventListener("click", function() {
        const buttonIndex = closePasswordAccountBtns.indexOf(item);
        const passwordAccountModal = document.querySelectorAll(".password-account-modal")[buttonIndex];
        closePasswordAccountModal(passwordAccountModal);
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
function openPasswordAccountModal(passwordAccountModal) {
    passwordAccountModal.classList.add("active");
    passwordAccountOverlay.classList.add("active");   
}

function closeModal(modal) {
    modal.classList.remove("active");
    overlay.classList.remove("active");
}
function closeResultModal(resultModal) {
    resultModal.classList.remove("active");
    resultOverlay.classList.remove("active");
}
function closePasswordAccountModal(passwordAccountModal) {
    passwordAccountModal.classList.remove("active");
    passwordAccountOverlay.classList.remove("active");
}