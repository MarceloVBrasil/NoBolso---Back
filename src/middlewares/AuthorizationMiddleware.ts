import { Request, Response, NextFunction } from "express";

function AutorizacaoMiddleware(dominio: string, permissoes: string[]) {
    return (req: Request, res: Response, next: NextFunction) => {
        next()
    }
}

export { AutorizacaoMiddleware }