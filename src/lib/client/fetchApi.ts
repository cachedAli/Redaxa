"use client"

import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios"

import { useUploadStore } from "@/components/store/uploadStore";


export const fetchApi = async (method: "Post" | "get" | "put" | "delete", url: string, data?: unknown, config?: AxiosRequestConfig) => {

    try {

        const response: AxiosResponse = await axios({
            url,
            method,
            data,
            ...config
        })

        return response;
    } catch (error: unknown) {
        const axiosError = error as AxiosError;
        console.log(error)
        if (axiosError.response?.data instanceof Blob) {
            try {
                const text = await axiosError.response.data.text();
                const parsed = JSON.parse(text);
                const friendlyMessage = parsed.error || parsed.message || "Something went wrong.";
                useUploadStore.getState().setFile(friendlyMessage);
            } catch (parseError) {
                console.log(parseError)
                useUploadStore.getState().setFile("Unexpected server response.");
            }
        } else {
            useUploadStore.getState().setFile("Network or server error. Please try again.");
        }
    }
};