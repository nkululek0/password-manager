const openModalBtn = document.querySelector(".open-modal");
const closeModalBtn = document.querySelector(".close-modal");

const overlay = document.querySelector("#overlay");

openModalBtn.addEventListener("click", function() {
    const modal = document.querySelector(".modal");
    openModal(modal);
});

closeModalBtn.addEventListener("click", function() {
    const modal = document.querySelector(".modal");
    closeModal(modal);
});

function openModal(modal) {
    modal.classList.add("active");
    overlay.classList.add("active");    
}

function closeModal(modal) {
    modal.classList.remove("active");
    overlay.classList.remove("active");
}