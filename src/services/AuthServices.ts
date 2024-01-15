import * as bcrypt from "bcrypt"
import { v4 as uuidV4 } from "uuid"

import { CadastrarSchemaType, LoginSchemaType, RefreshTokenType } from "../controllers/schemas/AuthSchema";
import { decodeJWT, encryptPassword, generateJWT, verifyJWT } from "./helpers/AuthHelpers";
import { variaveisAmbiente } from "../utils/EnvironmentVariables";
import { IUserRepository } from "../repository/interfaces/IUserRepository";
import { IUser } from "../models/User";

const { ACCESS_TOKEN_EXPIRATION, REFRESH_TOKEN_EXPIRATION } = variaveisAmbiente
export class AuthService {
    constructor(
        private userRepository: IUserRepository,
    ) { }

    async login(data: LoginSchemaType) {
        const user = await this.userRepository.getByEmail(data.email) as any
        if (!user) throw new Error("Email e/ou senha inválidos")

        const seSenhaValida = await bcrypt.compare(data.senha, user.senha as string)
        if (!seSenhaValida) throw new Error("Email e/ou senha inválidos")

        const payload = {
            id: user.id,
            nome: user.nome,
        }
        const token = generateJWT(payload, ACCESS_TOKEN_EXPIRATION as string)
        const refreshToken = generateJWT(payload, REFRESH_TOKEN_EXPIRATION as string)

        return { token, refreshToken }
    }

    async cadastrar(data: IUser) {
        const seEmailExistente = await this.userRepository.getByEmail(data.email)
        if (!!seEmailExistente) throw new Error("Email já cadastrado")

        const { email, senha, nome } = data
        const user = { email, senha: encryptPassword(senha as string), nome, id: uuidV4(), createdAt: new Date(), updatedAt: new Date() }

        return await this.userRepository.add(user)
    }

    async update(userId: string, data: IUser) {
        const seUsuarioExiste = await this.userRepository.getById(userId)
        if (!seUsuarioExiste) throw new Error('Usuário não cadastrado')

        const usuario = await this.userRepository.getByEmail(data.email)
        const seOutroUsuarioPossuiEsseEmail = !!usuario && usuario.id != userId
        if (seOutroUsuarioPossuiEsseEmail) throw new Error('Email já cadastrado')

        return await this.userRepository.update(userId, data)
    }

    async delete(userId: string) {
        return await this.userRepository.delete(userId)
    }

    async refreshToken(data: RefreshTokenType) {
        const seTokenValido = verifyJWT(data.token)
        const seRefreshTokenValido = verifyJWT(data.refreshToken)
        if (!seTokenValido && !seRefreshTokenValido) throw new Error('Token e Refresh Token inválidos')

        const { id, nome, categories } = decodeJWT(data.refreshToken)
        const user = { id, nome, categories }

        const accessToken = generateJWT(user, ACCESS_TOKEN_EXPIRATION as string)
        const refreshToken = generateJWT(user, REFRESH_TOKEN_EXPIRATION as string)
        return { accessToken, refreshToken }
    }
}