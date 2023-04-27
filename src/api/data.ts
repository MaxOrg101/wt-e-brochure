import { ApiResponse, axios_instance } from "./axios"

type Data = {
    title: string,
    data: string
}
export const post_data = (title: string, data: string) => {
    const body: Data = {
        data, title
    }
    return axios_instance.post<ApiResponse<never>>("brochuredata", body)
}
export const get_data = () => {
    return axios_instance.get<ApiResponse<Data[]>>("brochuredata")
}