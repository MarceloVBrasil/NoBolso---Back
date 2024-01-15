import * as jwt from "jsonwebtoken"
import * as bcrypt from "bcrypt"
import { variaveisAmbiente } from "../../utils/EnvironmentVariables"

const { JWT_ASSINATURA } = variaveisAmbiente

function generateJWT(payload: any, expiresIn: string) {
    const options = {
        expiresIn
    }

    return jwt.sign(payload, JWT_ASSINATURA as string, options)
}

function verifyJWT(data: string): boolean {
    try {
        const [prefixo, token] = data.split(' ')
        return (prefixo === 'Bearer' && !!jwt.verify(token, JWT_ASSINATURA as string))
    } catch (error) {
        return false
    }
}

function encryptPassword(senha: string) {
    return bcrypt.hashSync(senha, 12)
}

function decodeJWT(token: string): any {
    token = token.split(' ')[1]
    const decodedToken = jwt.decode(token)
    return decodedToken
}

export { generateJWT, verifyJWT, decodeJWT, encryptPassword }