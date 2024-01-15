import { createAxiosInstance } from "./axiosInstance";

async function getTokens(port: string) {
    const axiosInstance = createAxiosInstance(port)
    const loginResponse = await axiosInstance.post('/login', { email: 'marcelo.vital.brasil@gmail.com', senha: '123' })
    const { token, refreshToken } = loginResponse.data

    return { token, refreshToken }
}

export { getTokens }