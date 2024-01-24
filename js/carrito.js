const d = document;
const btnCart = d.getElementById("btnCart");
const btnCloseCart = d.getElementById("btnCloseCart");
//arrays
const todoProductos = d.querySelectorAll(".card2")
let carritoProductos = [];
let conta = 0;
let seRepite = false;
//llenar carrito con productos seleccionados
const contentModal = d.getElementById("contentModal");
todoProductos.forEach(p =>{
    const btnComprar = p.children[1].children[1];
    btnComprar.addEventListener("click",()=>{
        const pId = 2;
        // console.log(pId);
        carritoProductos.forEach(p => {
            if(p.Id === pId){
                seRepite = true;
                console.log(seRepite);
            }
            else{
                console.log(seRepite);
            }
        });
        carritoProductos.push({
            Id: conta,
            Img: p.children[0].children[0].getAttribute("src"),
            Name: p.children[0].children[1].textContent,
            Price: parseInt(p.children[1].children[0].textContent),
            Quantity : 1
        });
        conta++;
        countCart();
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
        <p>${p.Quantity}</p>
        <button class="closeProduct" id="btnCloseProduct">X</button>
        `;
        contentModal.appendChild(cartProduct);
        const btnDeleteProduct = cartProduct.children[4];
        deleteProduct(btnDeleteProduct,p);
    })
    let totalPagar = carritoProductos.reduce((acc, p)=>acc + p.Price,0);
    d.getElementById("payTotal").textContent = totalPagar;
})
btnCloseCart.addEventListener("click",()=>{
    d.getElementById("conteinerModal").classList.add("cOff");
})
const deleteProduct=(btnDelete,product)=>{
    let conta2 =0;
    btnDelete.addEventListener("click",(e)=>{
        const myId = product.Id;
        const myProduct = e.target.parentElement;
        contentModal.removeChild(myProduct);
        carritoProductos.forEach(p => {
            if(p.Id === myId){
                carritoProductos.splice(conta2,1);
                conta2 = 0;
                countCart();
            }
            else{
                conta2++;
            }
        }) 
    })
}
const countCart = ()=>{ 
   
    if(carritoProductos.length >= 1){
        let long = carritoProductos.length;
        const quantityProducts = d.getElementById("countCart");
        quantityProducts.style.display = "block";
        quantityProducts.innerText = long;
    }
    else{
        // const quantityProducts = d.getElementById("countCart");
        // quantityProducts.style.display = "none";
        d.getElementById("countCart").style.display ="none";
    }
   
}
