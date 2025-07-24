"use client"

import { useUploadStore } from "@/components/store/uploadStore";
import axios, { AxiosResponse } from "axios"


export const useFetchApi = async (method: "Post" | "get" | "put" | "delete", url: string, data?: any, config?: any) => {

    try {

        let response: AxiosResponse

        response = await axios({
            url,
            method,
            data,
            ...config
        })

        return response;
    } catch (error: any) {
        console.log(error)
        if (error.response?.data instanceof Blob) {
            try {
                const text = await error.response.data.text();
                const parsed = JSON.parse(text);
                const friendlyMessage = parsed.error || parsed.message || "Something went wrong.";
                useUploadStore.getState().setFile(friendlyMessage);
            } catch (parseError) {
                useUploadStore.getState().setFile("Unexpected server response.");
            }
        } else {
            useUploadStore.getState().setFile("Network or server error. Please try again.");
        }
    }
};