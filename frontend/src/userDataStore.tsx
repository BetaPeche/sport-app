import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type DataItem = {
    _id?: string
    userId: string
    date: Date
    weight: number | null
    muscularMass: number | null
    water: number | null
    visceralFat: number | null
    protein: number | null
    __v?: number
}

type UserDataStore = {
    data: DataItem[]
    addData: (newData: DataItem) => void
    setData: (data: DataItem[]) => void
    removeDatas: () => void
}

const useUserDataStore = create<UserDataStore>()(
    persist(
        (set) => ({
            data: [],
            addData: (newData: DataItem) =>
                set((state) => ({
                    data: [...state.data, newData],
                })),
            setData: (data: DataItem[]) =>
                set(() => ({
                    data,
                })),
            removeDatas: () =>
                set(() => ({
                    data: [],
                })),
        }),
        {
            name: 'user-data-storage',
        }
    )
)

export default useUserDataStore
