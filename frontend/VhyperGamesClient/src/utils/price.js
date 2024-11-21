
/**
 * ConvertToDecimal
 * 
 * Recibe el precio en céntimos y lo devuelve en euros.
 * 
 * cent -> €
 * 
 * @param {*} cent
 * @returns euros
 */
export function ConvertToDecimal(cent) {
  return (cent / 100).toFixed(2).replace('.', ',');
}

/**
 * TotalPrice:
 * Calcula el precio total.
 * 
 * Ejemplo de data:
 * data = [{price: 1000, quantity: 5},{price: 3000, quantity: 2}];
 * 
 * @param {*} data [{price, quantity}]
 * @returns Precio total en centimos
 */
export function TotalPrice(data) {
  let totalPrice = 0;

  data.forEach(game => {
    totalPrice += game.price * game.quantity; 
  });

  return totalPrice; 
}