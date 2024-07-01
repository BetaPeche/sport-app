import Modal from 'react-modal'
import Button from './Button'
import { useEffect, useState, ChangeEvent, FormEvent } from 'react'
import Loader from './Loader'
import useUserDataStore from '../stores/userDataStore'

interface CustomModalProps {
    isOpen: boolean
    onRequestClose: () => void
}

type FormData = {
    weight: number | null
    'muscular-mass': number | null
    water: number | null
    'visceral-fat': number | null
    protein: number | null
}

Modal.setAppElement('#root')

const CustomModal: React.FC<CustomModalProps> = ({
    isOpen,
    onRequestClose,
}) => {
    const { addData } = useUserDataStore()
    const [error, setError] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const [formData, setFormData] = useState<FormData>({
        weight: null,
        'muscular-mass': null,
        water: null,
        'visceral-fat': null,
        protein: null,
    })
    const id = localStorage.getItem('userId')!

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

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target

        setFormData({
            ...formData,
            [name]: value,
        })
    }

    function afterOpenModal(): void {
        const firstInput = document.querySelector<HTMLInputElement>('input')
        if (firstInput) {
            firstInput.focus()
        }
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        let errorMessage = ''

        switch (true) {
            case formData.weight === null ||
                formData['muscular-mass'] === null ||
                formData.water === null ||
                formData['visceral-fat'] === null ||
                formData.protein === null:
                errorMessage = 'Veuillez remplir tous les champs'
                break
            default:
                break
        }

        setError(errorMessage)

        if (errorMessage === '') {
            try {
                setLoading(true)
                await fetch(`${import.meta.env.VITE_URL_API}/user/data`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        userId: id,
                        date: new Date(Date.now()),
                        weight: formData.weight,
                        muscularMass: formData['muscular-mass'],
                        water: formData.water,
                        visceralFat: formData['visceral-fat'],
                        protein: formData.protein,
                    }),
                })
                addData({
                    userId: id,
                    date: new Date(Date.now()),
                    weight: formData.weight,
                    muscularMass: formData['muscular-mass'],
                    water: formData.water,
                    visceralFat: formData['visceral-fat'],
                    protein: formData.protein,
                })
                setFormData({
                    weight: null,
                    'muscular-mass': null,
                    water: null,
                    'visceral-fat': null,
                    protein: null,
                })
            } catch (error) {
                setError('Une erreur réseau est survenue')
            }
            setLoading(false)
            onRequestClose()
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
                <i className="fa-solid fa-xmark"></i>
            </button>
            <form onSubmit={handleSubmit}>
                <label htmlFor="weight">
                    Poids <span>(en kilogrammes)</span>
                </label>
                <input
                    type="number"
                    name="weight"
                    id="weight"
                    placeholder='Ex: "80"'
                    value={formData.weight !== null ? formData.weight : ''}
                    onChange={handleChange}
                    min="0"
                />
                <label htmlFor="muscular-mass">
                    Masse Musculaire <span>(en %)</span>
                </label>
                <input
                    type="number"
                    name="muscular-mass"
                    id="muscular-mass"
                    placeholder='Ex: "30"'
                    value={
                        formData['muscular-mass'] !== null
                            ? formData['muscular-mass']
                            : ''
                    }
                    onChange={handleChange}
                    min="0"
                    max="100"
                />
                <label htmlFor="water">
                    Eau <span>(en %)</span>
                </label>
                <input
                    type="number"
                    name="water"
                    id="water"
                    placeholder='Ex: "30"'
                    value={formData.water !== null ? formData.water : ''}
                    onChange={handleChange}
                    min="0"
                    max="100"
                />
                <label htmlFor="visceral-fat">
                    Graisse Viscérale <span>(en %)</span>
                </label>
                <input
                    type="number"
                    name="visceral-fat"
                    id="visceral-fat"
                    placeholder='Ex: "30"'
                    value={
                        formData['visceral-fat'] !== null
                            ? formData['visceral-fat']
                            : ''
                    }
                    onChange={handleChange}
                    min="0"
                    max="100"
                />
                <label htmlFor="protein">
                    Protéine <span>(en %)</span>
                </label>
                <input
                    type="number"
                    name="protein"
                    id="protein"
                    placeholder='Ex: "30"'
                    value={formData.protein !== null ? formData.protein : ''}
                    onChange={handleChange}
                    min="0"
                    max="100"
                />
                <span>{error}</span>
                {loading ? (
                    <Loader />
                ) : (
                    <Button text="Enregistrer" color={true} />
                )}
            </form>
        </Modal>
    )
}

export default CustomModal
