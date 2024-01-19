const d = document;
const btnCart = d.getElementById("btnCart");
const btnCloseCart = d.getElementById("btnCloseCart");
//arrays
const todoProductos = d.querySelectorAll(".card2")
let carritoProductos = [];

btnCart.addEventListener("click",(e)=>{
    d.getElementById("conteinerModal").classList.remove("cOff");
})
btnCloseCart.addEventListener("click",()=>{
    d.getElementById("conteinerModal").classList.add("cOff");
})
