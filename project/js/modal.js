'use strict';

let modal = document.getElementById("modal__window");
let openBtn = document.getElementById("modal__btn");
let closeBtn = document.getElementsByClassName("close__modal__btn")[0];

openBtn.addEventListener("click",  () => modal.style.display = "block");
closeBtn.addEventListener("click",  () => modal.style.display = "none");
document.addEventListener("click", event => {
    if (event.target == modal) {
        modal.style.display = "none";
    };
});