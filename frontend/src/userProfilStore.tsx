import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type ProfilItem = {
    userId?: string | null
    _id?: string
    activity: number
    age: number | null
    gender: number
    height: number | null
    name: string
    objectiveWeight: number | null
    __v?: number
}

type UserProfilStore = {
    profil: ProfilItem | null
    setProfil: (profil: ProfilItem) => void
    removeProfil: () => void
}

const useUserProfilStore = create<UserProfilStore>()(
    persist(
        (set) => ({
            profil: null,
            setProfil: (profil: ProfilItem) =>
                set(() => ({
                    profil,
                })),
            removeProfil: () =>
                set(() => ({
                    profil: null,
                })),
        }),
        {
            name: 'user-profil-storage',
        }
    )
)

export default useUserProfilStore
