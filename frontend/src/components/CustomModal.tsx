import Modal from 'react-modal'
import Button from './Button'
import { useEffect } from 'react'

interface CustomModalProps {
    isOpen: boolean
    onRequestClose: () => void
}

Modal.setAppElement('#root')

const CustomModal: React.FC<CustomModalProps> = ({
    isOpen,
    onRequestClose,
}) => {
    useEffect(() => {
        if (isOpen) {
            document.body.classList.add('modal-open')
        } else {
            document.body.classList.remove('modal-open')
        }
        return () => {
            document.body.classList.remove('modal-open')
        }
    }, [isOpen])

    function afterOpenModal(): void {
        const firstInput = document.querySelector<HTMLInputElement>('input')
        if (firstInput) {
            firstInput.focus()
        }
    }

    return (
        <Modal
            isOpen={isOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={onRequestClose}
            className="Modal"
            overlayClassName="Overlay"
            contentLabel="Modale de saisie des données"
        >
            <button className="close-modal" onClick={onRequestClose}>
                X
            </button>
            <form>
                <label htmlFor="weight">Poids</label>
                <input type="number" name="weight" id="weight" />
                <label htmlFor="muscular-mass">Masse Musculaire</label>
                <input type="number" name="muscular-mass" id="muscular-mass" />
                <label htmlFor="water">Eau</label>
                <input type="number" name="water" id="water" />
                <label htmlFor="visceral-fat">Graisse Viscérale</label>
                <input type="number" name="visceral-fat" id="visceral-fat" />
                <label htmlFor="protein">Protéine</label>
                <input type="number" name="protein" id="protein" />
                <Button text="Enregistrer" color={true} />
            </form>
        </Modal>
    )
}

export default CustomModal
