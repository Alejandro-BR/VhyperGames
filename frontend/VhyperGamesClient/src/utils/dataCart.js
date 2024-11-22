/**
 * CreateData
 * Combina datos de LocalStorage con detalles de juegos.
 * 
 * @param {Array} ls - LocalStorage. 
 * @param {Array} gameDetails - Lista de detalles de juegos. 
 * @returns {Array} - [{price, quantity}]:
 */
export function CreateData(ls, gameDetails) {

  const data = ls.map(localItem => {
    const gameId = Number(localItem.gameId);
    const backGame = gameDetails.find(game => game.idGame === gameId);

    if (backGame) {
      return {
        price: backGame.price,  
        quantity: localItem.quantity, 
      };
    }

    return null; 
  }).filter(item => item !== null);  

  return data; 
}
