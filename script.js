const guide = document.querySelector("#guide");
const dialog = document.querySelector("#dialog");
const slider = document.querySelector(".slider");

const currentResText = document.querySelector("#currentRes");

var resolution = 16;

guide.addEventListener("click", () => {
    showModal();
});

const closeDialog = () => {
    dialog.close();
};

const showModal = () => {
    dialog.showModal();
};

const updateResolution = () => {
    resolution = slider.value;
    currentResText.innerText = `Current: ${resolution}`;
};
