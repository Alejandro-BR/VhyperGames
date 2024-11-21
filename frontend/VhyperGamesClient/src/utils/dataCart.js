export function CreateData() {
  const localstorage = [
    {
      "gameId": 1,
      "quantity": 6
    },
    {
      "gameId": 2,
      "quantity": 4
    },
    {
      "gameId": 12,
      "quantity": 1
    }
  ];

  const dataBack = [
    {
      "idGame": 1,
      "title": "The Witcher III",
      "price": 1799,
      "imageGame": {
        "id": 1,
        "gameId": 1,
        "imageUrl": "images/TheWitcher3/thewitcher3.png",
        "altText": "Banner de The Witcher III"
      },
      "stock": 100
    },
    {
      "idGame": 2,
      "title": "The Elder Scroll V: Skyrim",
      "price": 2999,
      "imageGame": {
        "id": 7,
        "gameId": 2,
        "imageUrl": "images/Skyrim/skyrim.png",
        "altText": "Imagen 1 de Skyrim"
      },
      "stock": 5
    },
    {
      "idGame": 12,
      "title": "Five Nights at Freddy's 2",
      "price": 799,
      "imageGame": {
        "id": 48,
        "gameId": 12,
        "imageUrl": "images/FiveNightsAtFreddys2/Freddy2.png",
        "altText": "Imagen 1 de fnaf2"
      },
      "stock": 100
    }
  ];

  let data = [];

  localstorage.forEach(localItem => {
    const backGame = dataBack.find(game => game.idGame === localItem.gameId);

    if (backGame) {
      data.push({
        price: backGame.price,
        quantity: localItem.quantity
      });
    }
  });

  return data;
}

