import { create } from "zustand"

type UploadStore = {
    file: string | undefined;
    setFile: (value: string) => void;

    fileName: string | undefined;
    setFileName: (value: string | undefined) => void;

    redactedFile: Blob | undefined;
    setRedactedFile: (value: Blob | undefined) => void;

    scrollToSection: boolean;
    setScrollToSection: (value: boolean) => void;

    manualRedactMode: boolean;
    setManualRedactMode: (value: boolean) => void;

}

export const useUploadStore = create<UploadStore>((set) => ({
    file: undefined,
    setFile: (value) => set({ file: value }),

    fileName: undefined,
    setFileName: (value) => set({ fileName: value }),

    redactedFile: undefined,
    setRedactedFile: (value) => set({ redactedFile: value }),

    scrollToSection: false,
    setScrollToSection: (value) => set({ scrollToSection: value }),

    manualRedactMode: false,
    setManualRedactMode: (value) => set({ manualRedactMode: value }),


}))