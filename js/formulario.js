//tema dark-light
const btnTema = document.getElementById("tipoTema");
const listaDark = document.querySelectorAll("[modoDark]");//obtener un lista con los elemenetos que tengas este atributo
const listaGray = document.querySelectorAll("[modoGray]");
let moon = "🌙",sun ="☀️";
const ModoD =(()=>{
    listaDark.forEach( e => e.classList.add("darkMode"));
    listaGray.forEach(e => e.classList.add("grayMode"));
    btnTema.textContent = sun;
    localStorage.setItem("tema","dark");
})
const ModoL =(()=>{
    listaDark.forEach(e => e.classList.remove("darkMode"));
    listaGray.forEach(e => e.classList.remove("grayMode"));
    btnTema.textContent = moon;
    localStorage.setItem("tema","light");

})
btnTema.addEventListener("click",()=>{
    btnTema.textContent === moon? ModoD():ModoL();
})
//cargue el ultimo tema seleccionado
document.addEventListener("DOMContentLoaded",()=>{
    (localStorage.getItem("tema") === null) && localStorage.setItem("tema","light");
    localStorage.getItem("tema")==="light" && ModoL();
    localStorage.getItem("tema")==="dark" && ModoD();
})
//menu hamburguesa
const nav = document.querySelector("#nav");
const open1 = document.querySelector("#open");
const close1 = document.querySelector("#close");

open1.addEventListener("click", () =>{ nav.classList.add("visible")})
close1.addEventListener("click",() =>{ nav.classList.remove("visible")})

//validar formulario
const formulario = document.getElementById("formulario");
const inputs = document.querySelectorAll("#formulario input")
const expresiones = {//pueden ser mas cortas y precisas
    nombre: /^[a-zA-Z\s]{1,40}$/,
    password: /^\w+$/,
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9]+\.[a-zA-Z0-9-.]+$/,
    telefono: /^\d+$/
}
const estadoInput={
    nombre: false,
    contraseña: false,
    email: false,
    telefono: false
};
//comprobar si el input coincide con la expresion
const validarCampo = (expresion,input,campo) =>{
    if(expresion.test(input.value)){
        //accedo a los atributos del INPUT por su ID
        document.getElementById(campo).classList.remove("borderMal");
        document.getElementById(campo).classList.add("borderBien");
        document.querySelector(`#grupo__${campo} p` ).classList.add("textOff");
        estadoInput[campo] = true;
    }
    else{
        document.getElementById(campo).classList.remove("borderBien");
        document.getElementById(campo).classList.add("borderMal");
        document.querySelector(`#grupo__${campo} p` ).classList.remove("textOff");
        estadoInput[campo] = false;
    }
}
const validarFormulario = (e)=>{
    switch(e.target.name){//atributo name del input
        case "nombre":
            //emprexion regular, elemento html input, id del INPUT
            validarCampo(expresiones.nombre,e.target,"nombre");
        break;
        case "email":
            validarCampo(expresiones.email,e.target,"email");
        break;
        case "telefono":
            validarCampo(expresiones.telefono,e.target,"telefono");
        break;
        case "contraseña":
            validarCampo(expresiones.password,e.target,"contraseña");
        break;
    }
}

inputs.forEach((input)=>{
    input.addEventListener("keyup", validarFormulario);
    input.addEventListener("blur",validarFormulario);
})
formulario.addEventListener("submit",(e)=>{
    // e.preventDefault();//no procesa los datos inputs
    if(estadoInput.nombre && estadoInput.contraseña && estadoInput.email && estadoInput.telefono){
        inputs.forEach(input=>{input.classList.remove("borderBien")})
        document.getElementById("iconBien").classList.remove("textOff");
        document.getElementById("iconMal").classList.add("textOff");
        setTimeout(()=>{document.getElementById("iconBien").classList.add("textOff");},5000);
        estadoInput.nombre = false;
        estadoInput.email = false;
        estadoInput.telefono = false;
        estadoInput.password = false;
        setTimeout(()=>{formulario.reset()},1000);
        e.preventDefault();

    }
    else{
        e.preventDefault();
        document.querySelector("#iconMal").classList.remove("textOff");
        document.querySelector("#iconBien").classList.add("textOff")
        setTimeout(()=>{document.querySelector("#iconMal").classList.add("textOff")},5000);
    }
});
