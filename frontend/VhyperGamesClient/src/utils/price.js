
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