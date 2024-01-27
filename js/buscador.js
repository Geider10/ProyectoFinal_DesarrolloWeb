//buscador de productos
const inputBuscar = document.getElementById("buscar");
const listaResultado = document.getElementById("resultadoList");
const allProductos = document.querySelectorAll(".card2");
const pError = document.getElementById("buscarError");
let convertirProducto = []; //lista de texto con las etiquetas de cada carta
allProductos.forEach((p,iterrador)=>{
    convertirProducto.push({
        id: iterrador,
        img: p.children[0].children[0].getAttribute("src"),
        name: p.children[0].children[1].textContent.toLowerCase(),
        price: parseInt(p.children[1].children[0].textContent),
        boton: p.children[1].children[1].textContent
    })
})

const createCard=((filtrado)=>{
    listaResultado.innerHTML="";
    if(filtrado.length >= 1){
        pError.style.display = "none";
        //crea el contenido de la carta que coincida con el input
        filtrado.forEach((p)=>{
            const contentCard = document.createElement("div");
            contentCard.classList.add("card2");
            contentCard.innerHTML=`
            <div class="imgCard">
                <img src="${p.img}" alt="zapatillas">
                <h3>"${p.name}"</h3>
            </div>
            <div class="compras">
                <p class="price">${p.price}</p>
                <button class="btnComprar" id="comprar">${p.boton}</button>
            </div>`
            listaResultado.appendChild(contentCard);
        });
    }
    else if(filtrado.length === 0){
        pError.style.display = "block";
    }
})
const validarInput=(()=>{
    const inputValue = inputBuscar.value.toLowerCase();
    //agrega en una lista las cartas que coincidan en real time
    if(inputValue.length >= 1){
        const filtradoProductos = convertirProducto.filter((p)=>p.name.includes(inputValue));
        createCard(filtradoProductos);
        allProductos.forEach(e => e.style.display ="none");
    }
    else{
        listaResultado.innerHTML="";
        pError.style.display="none";
        allProductos.forEach(e => e.style.display ="block");
    }
});
inputBuscar.addEventListener("keyup",validarInput);