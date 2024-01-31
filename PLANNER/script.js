//Función que me aplica el estilo a la opciòn seleccionada y quita la previamente seleccionada
function seleccionar(link) {
    var opciones = document.querySelectorAll('#links  a');
    opciones[0].className = "";
    opciones[1].className = "";
    opciones[2].className = "";
    opciones[3].className = "";
    opciones[4].className = "";
    link.className = "seleccionado";

    //Hacemos desaparecer el menu una vez que se ha seleccionado una opcion
    //en modo responsive
    var x = document.getElementById("nav");
    x.className = "";
}

//función que muestra el menu responsive
function responsiveMenu() {
    var x = document.getElementById("nav");
    if (x.className === "") {
        x.className = "responsive";
    } else {
        x.className = "";
    }
}

//detecto el scrolling para aplicar la animación del la barra de habilidades
window.onscroll = function() { efectoHabilidades() };

//funcion que aplica la animación de la barra de habilidades
function efectoHabilidades() {
    var skills = document.getElementById("skills");
    var distancia_skills = window.innerHeight - skills.getBoundingClientRect().top;
    if (distancia_skills >= 300) {
        document.getElementById("decoracion").classList.add("barra-progreso1");
        document.getElementById("arte").classList.add("barra-progreso2");
        document.getElementById("alimentar").classList.add("barra-progreso3");
        document.getElementById("innovador").classList.add("barra-progreso4");
    }

}
//Modales jajaja
function mostrarModal(servicio) {
    Swal.fire({
        title: servicio,
        text: obtenerTexto(servicio),
        imageUrl: "https://unsplash.it/400/200",
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: "Custom image"
    });
}
function obtenerImg(servicio){
    switch (servicio) {
        case 'Wedding Planner':
            return "";
        case 'Lugar':
            return "";
        case 'Mobiliario':
            return "";
        case 'Catering':
            return "";
        case 'Decoración':
            return "";
        case 'Sonido y Fotografía':
            return "";
        default:
            return "";
}
}
function obtenerTexto(servicio) {
    switch (servicio) {
        case 'Wedding Planner':
            return "Transformamos sueños en eventos inolvidables. Deja que nuestro equipo de wedding planners te guíe en este viaje hacia tu día perfecto. Tu historia, nuestra pasión";
        case 'Lugar':
            return "Descubre el lugar donde los sueños toman forma. Un espacio único que se convierte en el lienzo perfecto para tu historia de amor. Bienvenido a un escenario que habla de ti.";
        case 'Mobiliario':
            return "Crea momentos inolvidables con nuestra colección de mobiliario elegante. Cada pieza es una declaración de estilo, transformando tu espacio en un escenario de ensueño.";
        case 'Catering':
            return "Seduce a tus invitados con una experiencia culinaria que despierta los sentidos. Nuestro catering va más allá de la comida; es una obra de arte para paladares exigentes.";
        case 'Decoración':
            return "Diseñamos emociones. Desde la delicadeza de los detalles hasta la grandeza de la ambientación, nuestra decoración convierte tu boda en una experiencia visual única.";
        case 'Sonido y Fotografía':
            return "Tu amor tiene su propia melodía, y nosotros la amplificamos con nuestra experiencia en sonido. Mientras cada nota resuena, nuestro equipo de fotógrafos captura instantes únicos, transformando tu día en una sinfonía visual de recuerdos inolvidables.";
        default:
            return "";
    }
}