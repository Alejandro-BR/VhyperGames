import ProductCard from "./productCard";



function productCardBlock() {


    const [juegos, setJuegos] = useState([]);

    // CREO QUE HABRÍA QUE HACER ALGO ASYNC PERO NO TENGO CLARO QUÉ
    // ME HE BASADO EN CATALOG BODY Y BLOCKGAME, PERO ME HA PARECIDO MEJOR METER TODA LA LOGICA EN EL COMPONENTE YA QUE AQUÍ NO HAY FILTROS

    try {
        const response = fetch(`${CATALOG_FILTER}?${queryParams}`, { // si query params esta vacio devolvia todos los juegos? De todas formas habría que modificar esto
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = response.json();

        setJuegos(Array.isArray(data.games) ? data.games : []);

    } catch (error) {
        console.error('Error al cargar los juegos:', error);
        setJuegos([]);
    } finally {
        setLoading(false);
    }


    return (
        <section>
            {juegos.map((game) => (
                <div key={game.id}>
                    <ProductCard imgUrl={game.imageUrl} title={game.title} price={game.price} stock={game.stock} id={game.id} />
                </div>
            ))}
        </section>
    );
}

export default productCardBlock