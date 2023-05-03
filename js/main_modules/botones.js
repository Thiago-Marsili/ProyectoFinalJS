import { toastify } from "./toastify.js";
import { carritoAgregados } from "./functionsProductos.js";
import { imprimirProductos } from "./functionsProductos.js";
import { imprimirProductosEnCarrito } from "./functionsProductos.js";
import { numerito } from "./functionsProductos.js";
import * as DomElements from "./domElements.js";

export function asignarBotonesAgregar(productos) {
    const botonesAgregar = document.querySelectorAll('.producto__agregar');
    botonesAgregar.forEach((botonAgregar) => {
      botonAgregar.addEventListener('click', function() {
          botonAgregarClicked(event, productos);
      }, false);
    });
  };
  
function botonAgregarClicked(event, productos) {
    const productoAgregadoPadre = event.target.closest('.producto');
    const productoAgregado = productos.find((buscarProducto) => buscarProducto.id == productoAgregadoPadre.id);
    const estaEnCarrito = carritoAgregados.find((buscarSiEsta) => buscarSiEsta.id == productoAgregadoPadre.id);
    if (estaEnCarrito) {
        estaEnCarrito.cantidad++; 
    } else {
        Object.assign(productoAgregado, {cantidad: 1}); 
        carritoAgregados.push(productoAgregado); 
    }
    imprimirProductosEnCarrito();
    toastify("agregado");
}

export function asignarBotonesMasMenos() {
    const botonesMas = document.querySelectorAll('.mas');
    const botonesMenos = document.querySelectorAll('.menos');

    botonesMas.forEach((botonMas) => {
        botonMas.addEventListener('click', botonMasClicked);
    });

    botonesMenos.forEach((botonMenos) => {
        botonMenos.addEventListener('click', botonMenosClicked);
    });
};

function botonMasClicked(event) {
    const productoAgregadoPadre = event.target.closest('.nuevoProducto');
    const productoAgregado = carritoAgregados.find((buscarProducto) => "agregado" + buscarProducto.id == productoAgregadoPadre.id);

    productoAgregado.cantidad++;
    imprimirProductosEnCarrito();
}

function botonMenosClicked(event) {
    const productoAgregadoPadre = event.target.closest('.nuevoProducto');
    const productoAgregado = carritoAgregados.find((buscarProducto) => "agregado" + buscarProducto.id == productoAgregadoPadre.id);
    
    if (productoAgregado.cantidad > 1) {
        productoAgregado.cantidad--;
        imprimirProductosEnCarrito();
    }
}

export function asignarBotonesBorrar() {
    const botonesBorrar = document.querySelectorAll('.carritoBorrar i');

    botonesBorrar.forEach((botonBorrar) => {
        botonBorrar.addEventListener('click', botonBorrarClicked);
    });
};

function botonBorrarClicked(event) {
    const productoAgregadoPadre = event.target.closest('.nuevoProducto');
    const productoAgregado = carritoAgregados.find((buscarProducto) => "agregado" + buscarProducto.id == productoAgregadoPadre.id);

    const index = carritoAgregados.indexOf(productoAgregado); 
    if (index > -1) {
        carritoAgregados.splice(index, 1); 
    }
    imprimirProductosEnCarrito();
    toastify("borrado");
}

DomElements.botonVaciar.addEventListener('click', popUpVaciarCarrito);
function popUpVaciarCarrito() {
    swal(`Tenés ${numerito} ${numerito > 1 ? "productos" : "producto"} en el carrito.`, {
        title: "¿Estás seguro?",
        icon: "warning",
        buttons: {
        cancel: "Cancelar",
        aceptar: {
            text: "Aceptar",
            value: "aceptar",
        },
        },
    })
    .then((value) => {
        switch (value) {

        case "aceptar":
            numerito > 1 ? swal(`Carrito vaciado. Se eliminaron ${numerito} productos.`,{icon: "success",}) : swal(`Carrito vaciado. Se eliminó ${numerito} producto.`,{icon: "success",});
            botonVaciarClicked();
            break; 
        }
    });
}

function botonVaciarClicked() {
    while (carritoAgregados.length) {
        carritoAgregados.pop();
    }
    imprimirProductosEnCarrito(); 
}

DomElements.botonCarrito.addEventListener("click", function(){
    DomElements.carrito.classList.remove("cerrado");
    DomElements.botonCarrito.classList.add("cerrado");
}); 

DomElements.cerrarCarrito.addEventListener("click", function(){
    DomElements.carrito.classList.add("cerrado");
    DomElements.botonCarrito.classList.remove("cerrado");
});
export function estaVacioCheck() {
    if(numerito == "0" || numerito == null) {
        DomElements.carrito.classList.add("cerrado");
    } else {
        if(DomElements.carrito.classList.contains("cerrado")){
            DomElements.botonCarrito.classList.remove("cerrado");
        }
    }
}


export function asignarBotonVerTodos(productos) {
    let verTodos = document.querySelector(".verTodos");
    verTodos.addEventListener("click", function() {
        verTodosClicked(productos);
    }, false);
};
function verTodosClicked(productos) {
    DomElements.listadoProductos.scrollIntoView();
    imprimirProductos(DomElements.listadoProductos, productos);
    
    DomElements.botonesCategorias.forEach((botonCategoria) => {
      botonCategoria.children[0].classList.remove("active"); 
    });
};

DomElements.tituloCategorias.addEventListener("click", function(){
    if ((screen.width < 577)) {
        for(let categoria of DomElements.botonesCategorias) {
            categoria.style.maxHeight = categoria.style.maxHeight === "100px" ? "0px" : "100px";
        }
    }
}); 