import axios, { AxiosResponse } from "axios"


export const useFetch = async (method: "Post" | "get" | "put" | "delete", url: string, data?: any, config?: any) => {

    try {

        let response: AxiosResponse

        response = await axios({
            url,
            method,
            data,
            ...config
        })

        return response;
    } catch (error) {
        console.log(error)
    }

}