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
