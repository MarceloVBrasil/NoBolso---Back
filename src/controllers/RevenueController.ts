import { Request, Response } from "express"
import { getByMonthSchema, addRevenueSchema, getTotalGroupedByDateSchema, deleteRevenueSchema, updateRevenueSchema } from "./schemas/RevenueSchema"
import { RevenueFactory } from "../services/factories/RevenueFactory"

export class RevenueController {
    constructor() { }

    async getTotalGroupedByDate(req: Request, res: Response) {
        try {
            const dadosValidados = await getTotalGroupedByDateSchema().validate({ ...req.body, ...req.query }, { stripUnknown: true })

            const revenueService = RevenueFactory()
            const { userId, startDate, endDate } = dadosValidados
            const resultado = await revenueService.getTotalGroupedByDate(userId, startDate, endDate)

            res.json(resultado)
        } catch (error: any) {
            return res.status(400).json({ erro: error.message })
        }
    }

    async getByMonthGroupedByCategory(req: Request, res: Response) {
        try {
            const revenueService = RevenueFactory()
            const dadosValidados = await getByMonthSchema().validate({ ...req.body, ...req.query }, { stripUnknown: true })

            const { userId, month, year } = dadosValidados
            const resultado = await revenueService.getByMonthGroupedByCategory(userId, month, year)
            res.json(resultado)
        } catch (error: any) {
            res.status(400).json({ erro: error.message })
        }
    }

    async getByMonthIndividually(req: Request, res: Response) {
        try {
            const revenueService = RevenueFactory()
            const dadosValidados = await getByMonthSchema().validate({ ...req.body, ...req.query }, { stripUnknown: true })

            const { userId, month, year } = dadosValidados
            const resultado = await revenueService.getByMonthIndividually(userId, month, year)
            res.json(resultado)
        } catch (error) {
            res.status(400).json({ erro: error.message })
        }
    }

    async add(req: Request, res: Response) {
        try {
            const dadosValidados = await addRevenueSchema().validate({ ...req.params, ...req.body }, { stripUnknown: true })

            const revenueService = RevenueFactory()

            const { userId, categoryId, total, month, year } = dadosValidados
            const resultado = await revenueService.add({
                userId, categoryId, total, data: new Date(`${year}/${month}/01`),
            })
            res.status(201).json(resultado)
        } catch (error: any) {
            res.status(400).json({ erro: error.message })
        }
    }

    async update(req: Request, res: Response) {
        try {
            const dadosValidados = await updateRevenueSchema().validate({ ...req.body, ...req.params }, { stripUnknown: true })
            const revenueService = RevenueFactory()
            const { id, categoryId, total, userId, month, year } = dadosValidados
            const resultado = await revenueService.update(id,
                { total, userId, data: new Date(`${year}/${month}/01`), categoryId })
            res.status(200).json(resultado)
        } catch (error: any) {
            res.status(400).json({ erro: error.message })
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const dadosValidados = await deleteRevenueSchema().validate({ ...req.body, ...req.params }, { stripUnknown: true })
            const revenueService = RevenueFactory()
            const { id } = dadosValidados
            const resultado = await revenueService.delete(id)
            res.status(200).json(resultado)
        } catch (error: any) {
            res.status(400).json({ erro: error.message })
        }
    }
}