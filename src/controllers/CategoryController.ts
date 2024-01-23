import { Request, Response } from "express"
import { addCategorySchema, deleteCategorySchema, getAllCategoriesSchema, getCategoriasByTipoSchema, updateCategorySchema } from "./schemas/CategorySchema"
import { CategoryFactory } from "../services/factories/CategoryFactory"

export class CategoryController {
    constructor() { }

    async getAll(req: Request, res: Response) {
        try {
            const categoryService = CategoryFactory()
            const dadosValidados = await getAllCategoriesSchema().validate({ ...req.body }, { stripUnknown: true })

            const resultado = await categoryService.getAll(dadosValidados.userId)
            res.json(resultado)
        } catch (error: any) {
            res.status(400).json({ erro: error.message })
        }
    }

    async getByTipo(req: Request, res: Response) {
        try {
            const categoryService = CategoryFactory()
            const dadosValidados = await getCategoriasByTipoSchema().validate({ ...req.body, ...req.query }, { stripUnknown: true })

            const { userId, tipo } = dadosValidados
            const resultado = await categoryService.getByTipo(userId, tipo)
            res.json(resultado)
        } catch (error: any) {
            res.status(400).json({ erro: error.message })
        }
    }

    async add(req: Request, res: Response) {
        try {
            const categoryService = CategoryFactory()
            const dadosValidados = await addCategorySchema().validate({ ...req.body }, { stripUnknown: true })
            const resultado = await categoryService.add(dadosValidados)
            res.status(201).json(resultado)
        } catch (error: any) {
            res.status(400).json({ erro: error.message })
        }
    }

    async update(req: Request, res: Response) {
        try {
            const categoryService = CategoryFactory()
            const dadosValidados = await updateCategorySchema().validate({ ...req.params, ...req.query, ...req.body }, { stripUnknown: true })

            const { id, nome, meta, userId, tipo } = dadosValidados
            const resultado = await categoryService.update(id, { nome, tipo, userId, meta: meta as number })
            res.json(resultado)
        } catch (error: any) {
            res.status(400).json({ erro: error.message })
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const categoryService = CategoryFactory()
            const dadosValidados = await deleteCategorySchema().validate({ ...req.params, ...req.body }, { stripUnknown: true })
            const { id } = dadosValidados
            const resultado = await categoryService.delete(id)
            res.json(resultado)
        } catch (error: any) {
            res.status(400).json({ erro: error.message })
        }
    }
}