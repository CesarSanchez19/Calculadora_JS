const pantalla = document.querySelector(".pantalla");
// Selecciona el elemento con la clase "pantalla" para mostrar la entrada y los resultados

let operacionPendiente = "";
// Almacena la operación pendiente (actualmente no utilizada)

let numeroAnterior = "";
// Almacena el número ingresado antes del operador

let operadorActual = null;
// Almacena el operador actual seleccionado

let reiniciarPantalla = false;
// Indica si la pantalla debe ser reiniciada después de mostrar el resultado

//* Función Agregar
function agregar(valor) {
    // Añade un valor (número u operador) a la pantalla
    if (reiniciarPantalla) {
        // Si la pantalla debe reiniciarse, vacía el valor actual
        pantalla.value = "";
        reiniciarPantalla = false;
    }

    if (["+", "-", "*", "/", "√"].includes(valor)) {
        // Si el valor es un operador
        if (operadorActual !== null) {
            // Si ya hay un operador seleccionado, realiza el cálculo
            calcular();
        }
        numeroAnterior = pantalla.value;
        // Guarda el número actual antes del operador
        operadorActual = valor;
        // Establece el operador actual
        reiniciarPantalla = true;
        // Indica que la pantalla debe reiniciarse para el próximo valor
    } else {
        pantalla.value += valor;
        // Agrega el valor (número o punto decimal) a la pantalla
    }
}

//* Función limpiar pantalla
function limpiar() {
    // Limpia la pantalla y reinicia todas las variables
    pantalla.value = '';
    operacionPendiente = '';
    numeroAnterior = '';
    operadorActual = null;
}

//* Función calcular
function calcular() {
    // Realiza el cálculo basado en los valores y el operador actual
    if (operadorActual === null) {
        // Si no hay un operador, no hace nada
        return;
    }

    const numero1 = parseFloat(numeroAnterior);
    // Convierte el número anterior en un número de punto flotante
    const numero2 = parseFloat(pantalla.value);
    // Convierte el número actual en pantalla en un número de punto flotante

    if (isNaN(numero1) || isNaN(numero2)) {
        // Si cualquiera de los números es inválido, muestra un error
        pantalla.value = 'Syntax Error';
        setTimeout(limpiar, 1500);
        // Limpia la pantalla después de 1.5 segundos
        return;
    }

    let resultado;
    // Variable para almacenar el resultado del cálculo

    switch (operadorActual) {
        case '+':
            resultado = numero1 + numero2;
            // Suma los dos números
            break;
        case '-':
            resultado = numero1 - numero2;
            // Resta el segundo número del primero
            break;
        case '*':
            resultado = numero1 * numero2;
            // Multiplica los dos números
            break;
        case '/':
            resultado = numero1 / numero2;
            // Divide el primer número por el segundo
            break;
        case '√':
            resultado = Math.sqrt(numero2);
            // Calcula la raíz cuadrada del segundo número
            break;
        default:
            pantalla.value = 'Error';
            // Muestra un error si el operador no es válido
            return;
    }

    resultado = Math.round(resultado * 100000000) / 100000000;
    // Redondea el resultado a 8 decimales
    pantalla.value = resultado;
    // Muestra el resultado en la pantalla
    operadorActual = null;
    // Reinicia el operador actual
    numeroAnterior = '';
    // Reinicia el número anterior
    reiniciarPantalla = true;
    // Indica que la pantalla debe ser reiniciada para la próxima entrada
}

// Función retroceder
function regresar() {
    // Elimina el último carácter de la pantalla
    pantalla.value = pantalla.value.slice(0, -1);
}

// Manejo de eventos
document.addEventListener('keydown', (event) => {
    // Escucha eventos de teclas presionadas
    event.preventDefault();
    // Previene el comportamiento predeterminado de la tecla
    const key = event.key;
    // Obtiene el valor de la tecla presionada

    if (/[0-9\+\-\*\/\./]/.test(key)) {
        // Si la tecla es un número, operador o punto decimal
        agregar(key);
        // Llama a la función agregar con la tecla presionada
    } else if (key === 'Enter') {
        // Si la tecla es Enter
        calcular();
        // Llama a la función calcular
    } else if (key === 'Escape') {
        // Si la tecla es Escape
        limpiar();
        // Llama a la función limpiar
    } else if (key === 'Backspace') {
        // Si la tecla es Backspace
        regresar();
        // Llama a la función regresar
    }
});
