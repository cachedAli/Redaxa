import { create } from "zustand"

type UploadStore = {
    file: string | undefined;
    setFile: (value: string) => void;

    scrollToSection: boolean;
    setScrollToSection: (value: boolean) => void;

}

export const useUploadStore = create<UploadStore>((set) => ({
    file: undefined,
    setFile: (value) => set({ file: value }),

    scrollToSection: false,
    setScrollToSection: (value) => set({ scrollToSection: value }),


}))