const d = document;
const btnCart = d.getElementById("btnCart");
const btnCloseCart = d.getElementById("btnCloseCart");
const todoProductos = d.querySelectorAll(".card2")
const contentModal = d.getElementById("contentModal");
let carritoProductos = [];
let conta = 0;

//si la izquierda no es verdadera sale la derecha false : null, undefined, 0, false " ".
carritoProductos = JSON.parse(localStorage.getItem("carrito")|| []);
todoProductos.forEach(p =>{//llenar array con productos select
    const btnComprar = p.children[1].children[1];
    btnComprar.addEventListener("click",()=>{
        const nam = p.children[0].children[1].textContent;
        const ckeck = carritoProductos.some(product =>{ return product.Name === nam? true : false})
        if(ckeck){
            carritoProductos.map((p)=>{ p.Name === nam && p.Quantity++;});
            saveCart();
        }
        else{
            carritoProductos.push({
                Id: conta,
                Img: p.children[0].children[0].getAttribute("src"),
                Name: p.children[0].children[1].textContent,
                Price: parseInt(p.children[1].children[0].textContent),
                Quantity : 1
            });
            conta++;
            countCart();
            saveCart();
        }
    })
})
//renderizar
btnCart.addEventListener("click",(e)=>{
    contentModal.innerHTML="";
    d.getElementById("conteinerModal").classList.remove("cOff");
    carritoProductos.forEach(p =>{
        const cartProduct = d.createElement("div");
        cartProduct.classList.add("cartProduct");
        cartProduct.innerHTML=`
        <img src="${p.Img}" class="imgModal" alt="Sapatilla con estilo">
        <h3>${p.Name}</h3>
        <p>${p.Quantity}</p>
        <p>${p.Price * p.Quantity}</p>
        <button class="closeProduct" id="btnCloseProduct">X</button>
        <p class="cOff">${p.Id}</p>`;
        contentModal.appendChild(cartProduct);
        const btnDeleteProduct = cartProduct.children[4];
        deleteProduct(btnDeleteProduct,p);
    })
   refreshTotal();
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
                refreshTotal();
                saveCart();
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
        localStorage.setItem("lenghtCart",long);
        const quantityProducts = d.getElementById("countCart");
        quantityProducts.style.display = "block";
        quantityProducts.innerText = JSON.parse(localStorage.getItem("lenghtCart"));
    }
    else{
        d.getElementById("countCart").style.display ="none";
    }
}
const refreshTotal = ()=>{
    let totalPagar = carritoProductos.reduce((acc, p)=>acc + (p.Price * p.Quantity),0);
    d.getElementById("payTotal").textContent = totalPagar;
}

const saveCart =()=>{ localStorage.setItem("carrito",JSON.stringify(carritoProductos))}
countCart();