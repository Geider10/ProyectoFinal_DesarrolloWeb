const nav = document.querySelector("#nav");
const open1 = document.querySelector("#open");
const close1 = document.querySelector("#close");

open1.addEventListener("click", () =>{
    nav.classList.add("visible");
})
close1.addEventListener("click",() =>{
    nav.classList.remove("visible");
})