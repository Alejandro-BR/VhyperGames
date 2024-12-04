import Button from "../Buttons/Button"
import GameFormModal from "./GameFormModal/GameFormModal";
import { useState } from "react";

function AddProductButton() {

    const [gameFormModal, setGameFormModal] = useState(false);

    return (
        <>
            <Button
                variant={"large"}
                color={"morado-azul"}
                onClick={() => setGameFormModal(true)}>
                Añadir producto
            </Button>

            {
                gameFormModal && (
                    <GameFormModal
                        modalPurpose="Añadir"
                        onClose={() => setGameFormModal(false)}
                    />
                )
            }
        </>
    )
}

export default AddProductButton