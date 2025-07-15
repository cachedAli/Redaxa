import { create } from "zustand"

type LoadingStore = {
    googleLoading: boolean;
    setGoogleLoading: (value: boolean) => void;
    logoutLoading: boolean;
    setLogoutLoading: (value: boolean) => void;
}

export const useLoadingStore = create<LoadingStore>((set) => ({
    googleLoading: false,
    logoutLoading: false,

    setGoogleLoading: (value) => set({ googleLoading: value }),
    setLogoutLoading: (value) => set({ logoutLoading: value })

}))