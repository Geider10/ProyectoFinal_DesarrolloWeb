const nav = document.querySelector("#nav");
const open1 = document.querySelector("#open");
const close1 = document.querySelector("#close");

open1.addEventListener("click", () =>{
    nav.classList.add("visible");
})
close1.addEventListener("click",() =>{
    nav.classList.remove("visible");
})

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
        //accedo directo a traves del Id del INPUT
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
    //le agrego el evento a cada input
    input.addEventListener("keyup", validarFormulario);//evento levanto la tecla
    input.addEventListener("blur",validarFormulario)//
})
formulario.addEventListener("submit",(e)=>{
    e.preventDefault();//no se envian los datos.
    if(estadoInput.nombre && estadoInput.contraseña && estadoInput.email && estadoInput.telefono){
        alert("Rellenaste el formulario con exito!!!");
        formulario.reset();
        document.querySelectorAll("#formulario input").forEach((input)=>{
            input.classList.remove("borderBien");
        })
    }
    else{
        alert("Por favor rellena el formulario correctamente");
    }
});
