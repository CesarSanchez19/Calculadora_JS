// Espera a que todo el contenido del DOM esté completamente cargado antes de ejecutar el código
document.addEventListener('DOMContentLoaded', function () {

    // Selecciona todos los elementos del DOM con la clase 'nav-item' y los guarda en una constante llamada 'navItems'
    const navItems = document.querySelectorAll('.nav-item');

    // Recorre cada uno de los elementos 'nav-item' con un ciclo forEach
    navItems.forEach((item, index) => {

        // Establece un temporizador para añadir la clase 'show' a cada elemento después de un tiempo determinado
        // '100 * index' establece un retardo creciente para cada elemento basado en su posición en la lista
        setTimeout(() => {
            // Añade la clase 'show' al elemento 'nav-item' actual para hacerlo visible o aplicar alguna animación
            item.classList.add('show');
        }, 100 * index); // Retardo en milisegundos basado en el índice del elemento

    });

});