import { Request, Response } from "express";
import { cadastrarSchema, loginSchema } from "./schemas/AuthSchema";
import { AuthFactory } from "../services/factories/AuthFactory";

export class AuthController {
    constructor() { }

    async login(req: Request, res: Response) {
        try {
            const dadosValidados = await loginSchema().validate(req.body, { stripUnknown: true })
            const authService = AuthFactory()
            const resultado = await authService.login(dadosValidados)
            res.json(resultado)

        } catch (error: any) {
            res.status(400).json({ erro: error.message })
        }
    }

    async cadastrar(req: Request, res: Response) {
        try {
            const dadosValidados = await cadastrarSchema().validate(req.body, { stripUnknown: true })

            const authService = AuthFactory()
            const { nome, senha, email } = dadosValidados
            const data = { nome, senha, email }
            const resultado = await authService.cadastrar(data)
            res.status(201).json(resultado)
        } catch (error: any) {
            res.status(400).json({ erro: error.message })
        }
    }
}