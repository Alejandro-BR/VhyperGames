
/**
 * ConvertToDecimal
 * 
 * Recibe el precio en céntimos y lo devuelve en euros.
 * 
 * cent -> €
 * 
 * @param {*} integer - centimos
 * @returns decimal - euros
 */
export function ConvertToDecimal(integer) {
  return integer / 100;
}