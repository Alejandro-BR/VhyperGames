/**
 * Muestra un mensaje en forma de alerta.
 * 
 * @param {string} message - El texto que se mostrará.
 */
function messages(message) {
  alert(message);
} 

/**
 * Muestra un mensaje informativo sobre la ausencia de productos en el catálogo.
 */
export function messageCatalog() {
  const message = "Actualmente no tenemos productos en el catálogo. ¡Vuelve pronto!";
  messages(message);
}

/**
 * Muestra un mensaje sobre el desarrollo de la funcionalidad del carrito.
 */
export function messageCart() {
  const message = "Estamos trabajando en la funcionalidad del carrito.";
  messages(message);
}

/**
 * Muestra un mensaje que informa sobre el "Sobre Nosotros".
 */
export function messageAboutUs() {
  const message = "Muy pronto podrás conocer más sobre nosotros.";
  messages(message);
}

/**
 * Muestra un mensaje informativo sobre el "Empresa".
 */
export function messageCompany() {
  const message = "Pronto podrás descubrir más sobre Vhyper Games.";
  messages(message);
}

/**
 * Muestra un mensaje informativo sobre el pago.
 */
export function messageEuros() {
  const message = "No se puede pagar en Euros todavia."
  messages(message);
}

/**
 * Muestra un mensaje informativo sobre el pago.
 */
export function messageEthereum() {
  const message = "No se puede pagar en Ethereum todavia."
  messages(message);
}