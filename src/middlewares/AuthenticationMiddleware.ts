import { Request, Response, NextFunction } from "express";
import { AuthFactory } from "../services/factories/AuthFactory";
import { decodeJWT } from "../services/helpers/AuthHelpers";

async function AutenticacaoMiddleware(req: Request, res: Response, next: NextFunction) {
    const { authorization, refresh_token } = req.headers
    const autenticacaoService = AuthFactory()

    try {
        if (authorization && refresh_token) {
            const tokens = await autenticacaoService.refreshToken({ token: authorization, refreshToken: refresh_token as string })
            res.set("authorization", tokens.accessToken)
            res.set("refresh_token", tokens.refreshToken)

            const decodedToken = decodeJWT(refresh_token as string)
            req.body.userId = decodedToken.id
            req.body.id_user_group = decodedToken.id_user_group
            next()
        } else {
            throw new Error("authorization e refresh_token são obrigatórios")
        }
    } catch (error: any) {
        res.status(403).json({ erro: error.message })
    }
}

export { AutenticacaoMiddleware }