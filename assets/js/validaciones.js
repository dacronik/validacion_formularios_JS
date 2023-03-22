export function valida(input) {
    const tipoDeInput = input.dataset.tipo;
    if (validadores[tipoDeInput]){
        validadores[tipoDeInput](input);
    }
    
    if(input.validity.valid){
        input.parentElement.classList.remove('input-container--invalid');
        input.parentElement.querySelector(".input-message-error").innerHTML =""
    }else {
        input.parentElement.classList.add('input-container--invalid');
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeError(tipoDeInput, input)
    }
}

const tipoErrores = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError",
]

const mensajesDeError = {
    nombre:{
        valueMissing: "Este campo nombre no puede estar vacío"
    },
    email: {
        valueMissing: "Este campo correo no puede estar vacío",
        typeMismatch: "El correo no es valido"
    },
    password: {
        valueMissing: "Este campo contraseña no puede estar vacío",
        patternMismatch: "Al menos 8 caracteres, debe contener una letra minúscula, una letra mayúscula, un numero"
    },
    nacimiento: {
        valueMissing: "Este campo no puede estar vacío",
        customError: "Debes tener al menos 18 años de edad"
    },
    numero: {
        valueMissing: "Este campo no puede estar vacío",
        patternMismatch: "El formato requerido es 9 xxxx xxxx"
    },
    direccion: {
        valueMissing: "Este campo no puede estar vacío",
        patternMismatch: "La Dirección debe contener entre 8 y 40 caracteres"
    },
    ciudad: {
        valueMissing: "Este campo no puede estar vacío",
        patternMismatch: "La Ciudad debe contener entre 4 y 30 caracteres"
    },
    region: {
        valueMissing: "Este campo no puede estar vacío",
        patternMismatch: "La Region debe contener entre 4 y 30 caracteres"
    }
}

const validadores = {
    nacimiento: (input) => validarNacimiento(input),
}

function mostrarMensajeError(tipoDeInput,input) {
    let mensaje = ""
    tipoErrores.forEach( error => {
        if(input.validity[error]) {
            mensaje = mensajesDeError[tipoDeInput][error]
        }
    });
    return mensaje
}

function validarNacimiento(input){
    const fechaCliente = new Date(input.value);
    let mensaje = "";
    if (!mayorEdad(fechaCliente)){
        mensaje = "Debes tener al menos 18 años de edad"
    }

    input.setCustomValidity(mensaje);
}

function mayorEdad(fecha){
    const fechaActual = new Date();
    const diferenciaFechas = new Date(
        fecha.getUTCFullYear() + 18, 
        fecha.getUTCMonth(), 
        fecha.getUTCDate())
    return diferenciaFechas <= fechaActual;
}