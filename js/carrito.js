const d = document;
const btnCart = d.getElementById("btnCart");
const btnCloseCart = d.getElementById("btnCloseCart");
//arrays
const todoProductos = d.querySelectorAll(".card2")
let carritoProductos = [];
let conta = 0;
//cards
const contentModal = d.getElementById("contentModal");
todoProductos.forEach(p =>{
    const btnComprar = p.children[1].children[1];
    btnComprar.addEventListener("click",()=>{
        carritoProductos.push({
            Id: conta,
            Img: p.children[0].children[0].getAttribute("src"),
            Name: p.children[0].children[1].textContent,
            Price: parseInt(p.children[1].children[0].textContent)
        })
        conta++;
    })
})
btnCart.addEventListener("click",(e)=>{
    contentModal.innerHTML="";
    d.getElementById("conteinerModal").classList.remove("cOff");
    carritoProductos.forEach(p =>{
        const cartProduct = d.createElement("div");
        cartProduct.classList.add("cartProduct");
        cartProduct.innerHTML=`
        <img src="${p.Img}" class="imgModal" alt="Sapatilla con estilo">
        <h3>${p.Name}</h3>
        <p>${p.Price}</p>
        <button class="closeProduct" id="btnCloseProduct"><i class="fa-solid fa-trash-can"></i></button>
        `;
        contentModal.appendChild(cartProduct);
    })
})
btnCloseCart.addEventListener("click",()=>{
    d.getElementById("conteinerModal").classList.add("cOff");
})
