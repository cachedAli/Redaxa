import { create } from "zustand"

type LoadingStore = {
    googleLoading: boolean;
    setGoogleLoading: (value: boolean) => void;
    logoutLoading: boolean;
    setLogoutLoading: (value: boolean) => void;

    copyLinkLoading: boolean;
    setCopyLinkLoading: (value: boolean) => void;

    showActionButtonsLoading: boolean;
    setShowActionButtonsLoading: (value: boolean) => void;

    redactResumeLoading: boolean;
    setRedactResumeLoading: (value: boolean) => void;

    redactSelectedTextLoading: boolean;
    setRedactSelectedTextLoading: (value: boolean) => void;
}

export const useLoadingStore = create<LoadingStore>((set) => ({
    googleLoading: false,
    logoutLoading: false,

    copyLinkLoading: false,
    showActionButtonsLoading: false,

    redactSelectedTextLoading: false,

    redactResumeLoading: false,

    setGoogleLoading: (value) => set({ googleLoading: value }),
    setLogoutLoading: (value) => set({ logoutLoading: value }),

    setCopyLinkLoading: (value) => set({ copyLinkLoading: value }),

    setShowActionButtonsLoading: (value) => set({ showActionButtonsLoading: value }),

    setRedactSelectedTextLoading: (value) => set({ redactSelectedTextLoading: value }),

    setRedactResumeLoading: (value) => set({ redactResumeLoading: value }),


}))