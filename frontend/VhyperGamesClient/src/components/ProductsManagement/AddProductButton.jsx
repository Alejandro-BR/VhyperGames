import Button from "../Buttons/Button"
import GameFormModal from "./GameFormModal/GameFormModal";
import { useState, useContext } from "react";
import { AdminContext } from "../../context/AdminContext";

function AddProductButton() {

    const [gameFormModal, setGameFormModal] = useState(false);
    const { postGame } = useContext(AdminContext);

    const handleSubmit = async (formData) => {
        await postGame(formData);
        setGameFormModal(false);
    };

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
                        onSubmit={handleSubmit}
                        onClose={() => setGameFormModal(false)}
                    />
                )
            }
        </>
    )
}

export default AddProductButton