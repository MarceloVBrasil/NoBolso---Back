import { Request, Response, NextFunction } from "express";
import { AuthFactory } from "../services/factories/AuthFactory";

function AutorizacaoMiddleware(dominio: string, permissoes: string[]) {
    return (req: Request, res: Response, next: NextFunction) => {
        next()
    }
}

export { AutorizacaoMiddleware }