import * as Botones from "./botones.js";
import * as DomElements from "./domElements.js";

export function toLocaleFixed (num) {
    return num.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
};

export function imprimirProductos(listadoProductos, productos) {
    listadoProductos.innerHTML = "";
    for (const producto of productos) {
        let contenedorProducto = document.createElement("div");
        contenedorProducto.className = "producto";
        contenedorProducto.id = producto.id;
        contenedorProducto.innerHTML = `
        <div class="producto__img">
            <img src="${producto.imagen}" alt="${producto.titulo}">
        </div>
        <h4 class="producto__titulo">${producto.titulo.toUpperCase()}</h4>
        <h4 class="producto__precio">$<span>${toLocaleFixed(producto.precio)}</span></h4>
        <div class="producto__agregar">AGREGAR AL CARRITO</div>
        <div class="producto__sinStock">SIN STOCK</div>
        `;
        listadoProductos.appendChild(contenedorProducto);
    }

    Botones.asignarBotonesAgregar(productos);
}

export let carritoAgregados = [];

export function imprimirProductosEnCarrito() {
    carritoProductos.innerHTML = "";
    carritoAgregados.forEach((productoAgregado) => {
        let nuevoProducto = document.createElement("div");
        nuevoProducto.className = "nuevoProducto";
        nuevoProducto.id = "agregado" + productoAgregado.id;
        nuevoProducto.innerHTML = `
            <div class="carritoImagen">
            <img src="${productoAgregado.imagen}" alt="${productoAgregado.titulo}">
            </div>
            <div class="carritoTitulo">${productoAgregado.titulo}</div>
            <div class="carritoCantidad">
            <div class="menos">-</div>
            <div class="cant">${productoAgregado.cantidad}</div>
            <div class="mas">+</div>
            </div>
            <div class="carritoPrecio">$${toLocaleFixed(productoAgregado.precio * productoAgregado.cantidad)}</div>
            <div class="carritoBorrar"><i class="fas fa-trash-alt"></i></div>
        `;
        carritoProductos.appendChild(nuevoProducto);
  });

  Botones.asignarBotonesMasMenos();
  Botones.asignarBotonesBorrar();
  actualizarPrecioTotal();
  actualizarNumerito();
  Botones.estaVacioCheck();
  localStorage.setItem("productos", JSON.stringify(carritoAgregados));
}

function actualizarPrecioTotal() {
    const precioTotal = carritoAgregados.reduce((suma, producto) => suma + (producto.precio * producto.cantidad), 0); 
    carritoTotal.textContent = toLocaleFixed(precioTotal);
    
    localStorage.setItem("precioTotal", precioTotal);
}

export let numerito = 0;
function actualizarNumerito() {
    DomElements.numeritoContenedor.classList.remove("shake");
    DomElements.numeritoContenedor.offsetWidth;
    DomElements.numeritoContenedor.classList.add("shake");
    numerito = carritoAgregados.reduce((suma, productoAgregado) => suma + parseInt(productoAgregado.cantidad), 0);
    DomElements.numeritoContenedor.textContent = numerito;

    localStorage.setItem("numerito", numerito);
};
numerito = localStorage.getItem("numerito");
if(numerito > 0) {
    carritoAgregados = localStorage.getItem("productos");
    carritoAgregados = JSON.parse(carritoAgregados);
    imprimirProductosEnCarrito();
}