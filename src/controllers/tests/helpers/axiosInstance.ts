import axios from "axios";

function createAxiosInstance(port: string) {
    return axios.create({
        baseURL: `http://localhost:${port}`,
        validateStatus: (status) => status >= 200 && status < 300 || status >= 400 && status < 500
    })
}

export { createAxiosInstance }