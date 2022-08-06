// Variables
const btnEnviar = document.querySelector('#enviar');
const formulario = document.querySelector('#enviar-mail');
const btnReset = document.querySelector('#resetBtn');

// Variable para campos
const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');
const er = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/

// Eventos
eventListeners();
function eventListeners(){
    // Cuando la app arranca
    document.addEventListener('DOMContentLoaded', iniciarApp);

    // Campos del formulario
    email.addEventListener('blur', validarFormulario);
    asunto.addEventListener('blur', validarFormulario);
    mensaje.addEventListener('blur', validarFormulario);

    //Reiniciar formulario
    btnReset.addEventListener('click', resetearFormulario);

    // Enviar el formulario
    btnEnviar.addEventListener('click', enviarEmail);
}



// Funciones

function iniciarApp(){
    btnEnviar.disabled = true;
    btnEnviar.classList.add('cursor-not-allowed', 'opacity-50');
}


// ValidarFormulario

function validarFormulario(e){

    if(e.target.value.length > 0){
        
        // Eliminar los errores
        const error = document.querySelector('p.error');
        if(error){
            error.remove();
        }
        e.target.style.borderColor = 'green';
    }else{
        e.target.style.borderColor = 'red';
        mostrarError('Todos los campos son obligatorios');
    }

    if(e.target.type == 'email'){
 //       const resultado = e.target.value.indexOf('@'); // Alternativa buscar que haya almenos una @
        if ( er.test( e.target.value)){
            mostrarError('E-mail valido');
            const error = document.querySelector('p.error');
            if(error){
                error.remove();
            }
        }else{
            e.target.style.borderColor = 'red';
            mostrarError('El E-mail no es valido');
        }
    }

    if(er.test( email.value) !== '' && asunto.value !== '' && mensaje.value !== ''){
        console.log('pasaste la validacion');
        btnEnviar.disabled = false;
        btnEnviar.classList.remove('cursor-not-allowed', 'opacity-50');

    }
}


function mostrarError(mensaje){
    const mensajeError = document.createElement('p');
    mensajeError.textContent = mensaje;
    mensajeError.classList.add('border','border-red-500', 'text-red-500', 'background-red-100', 'text-center', 'p-3', 'mt-5', 'text-center', 'error');

    const errores = document.querySelectorAll('.error');
    if(errores.length == 0){
        formulario.appendChild(mensajeError);
    }
}


// Funcion enviar email
function enviarEmail(e){
    e.preventDefault();
    
    // Mostrar spinner
    const spinner = document.querySelector('#spinner');
    spinner.style.display = 'flex';

    // Ocultar spinner y mostrar texto
    setTimeout(() => {
        spinner.style.display = 'none';
        const enviado = document.createElement('p');
        enviado.textContent = 'Enviado';
        enviado.classList.add('text-center', 'my-10', 'p-2', 'bg-green-500', 'text-white', 'font-bold', 'text-center', 'upercase');
        formulario.insertBefore(enviado, spinner);
        setTimeout(() => {
            enviado.remove();
            resetearFormulario();
        } , 3000);
    }, 2000

)};


function resetearFormulario(){
    formulario.reset();
    iniciarApp();
}