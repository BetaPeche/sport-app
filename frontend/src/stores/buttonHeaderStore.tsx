import { create } from 'zustand'

type Button = 'close' | 'open'
type ButtonStore = {
    button: Button
    toggleButton: () => void
}

const buttonHeaderStore = create<ButtonStore>((set) => ({
    button: 'close',
    toggleButton: () =>
        set((state) => ({
            button: state.button === 'close' ? 'open' : 'close',
        })),
}))

export default buttonHeaderStore
