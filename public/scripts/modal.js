// selects create account modal
const openModalBtn = document.querySelector(".open-modal");
const closeModalBtn = document.querySelector(".close-modal");

// selects result of create account modal
const openResultBtn = document.querySelector(".open-result-modal");
const closeResultOkBtn = document.querySelector(".result-ok");
const closeResultNoBtn = document.querySelector(".result-no");

const closeResultModalBtns = [closeResultOkBtn, closeResultNoBtn];

// selects overlay for all modals
const overlay = document.querySelector("#overlay");
const resultOverlay = document.querySelector("#result-overlay");

openModalBtn.addEventListener("click", function() {
    const modal = document.querySelector(".modal");
    openModal(modal);
});
openResultBtn.addEventListener("click", function(event) {
    event.preventDefault();
    const resultModal = document.querySelector(".result-modal");
    openResultModal(resultModal);
});

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

function openModal(modal) {
    modal.classList.add("active");
    overlay.classList.add("active");    
}
function openResultModal(resultModal) {
    resultModal.classList.add("active");
    resultOverlay.classList.add("active");
}

function closeModal(modal) {
    modal.classList.remove("active");
    overlay.classList.remove("active");
}
function closeResultModal(resultModal) {
    resultModal.classList.remove("active");
    resultOverlay.classList.remove("active");
}