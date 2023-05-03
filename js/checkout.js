import * as FunctionsCheckout from "./checkout_modules/functionsCheckout.js";

let carritoAgregados = localStorage.getItem("productos");
carritoAgregados = JSON.parse(carritoAgregados);

FunctionsCheckout.imprimirProductos(carritoAgregados);
FunctionsCheckout.cargarPrecioTotal(carritoAgregados); 