import { Request, Response } from "express"

import { addExpenseSchema, deleteExpenseSchema, getByMonthSchema, getTotalGroupedByDateSchema, updateExpenseSchema } from "./schemas/ExpensesSchema"
import { ExpensesFactory } from "../services/factories/ExpensesFactory"

export class ExpensesController {
    constructor() { }

    async getTotalGroupedByDate(req: Request, res: Response) {
        try {
            const dadosValidados = await getTotalGroupedByDateSchema().validate({ ...req.body, ...req.query }, { stripUnknown: true })

            const expenseService = ExpensesFactory()
            const { userId, startDate, endDate } = dadosValidados

            const resultado = await expenseService.getTotalGroupedByDate(userId, startDate, endDate)

            res.json(resultado)
        } catch (error: any) {
            return res.status(400).json({ erro: error.message })
        }
    }

    async getByMonthIndividually(req: Request, res: Response) {
        try {
            const dadosValidados = await getByMonthSchema().validate({ ...req.body, ...req.query }, { stripUnknown: true })
            const expenseService = ExpensesFactory()
            const { userId, month, year } = dadosValidados
            const resultado = await expenseService.getByMonthIndividually(userId, month, year)

            res.json(resultado)
        } catch (error: any) {
            console.log(error.message)
            res.status(400).json({ erro: error.message })
        }
    }

    async getByMonthGroupedByCategory(req: Request, res: Response) {
        try {
            const dadosValidados = await getByMonthSchema().validate({ ...req.body, ...req.query }, { stripUnknown: true })

            const expenseService = ExpensesFactory()
            const { userId, month, year } = dadosValidados
            const resultado = await expenseService.getByMonthGroupedByCategory(userId, month, year)

            return res.json(resultado)
        } catch (error: any) {
            return res.status(400).json({ erro: error.message })
        }
    }

    async add(req: Request, res: Response) {
        try {
            const dadosValidados = await addExpenseSchema().validate({ ...req.body }, { stripUnknown: true })
            const expenseService = ExpensesFactory()

            const { userId, categoryId, total, month, year } = dadosValidados
            const resultado = await expenseService.add({
                userId, categoryId, total, data: new Date(`${year}/${month}/01`)
            })
            res.status(201).json(resultado)
        } catch (error: any) {
            res.status(400).json({ erro: error.message })
        }
    }

    async update(req: Request, res: Response) {
        try {
            const dadosValidados = await updateExpenseSchema().validate({ ...req.body, ...req.params }, { stripUnknown: true })
            const expenseService = ExpensesFactory()

            const { id, userId, total, month, year, categoryId } = dadosValidados
            const resultado = await expenseService.update(id, { userId, data: new Date(`${year}/${month}/01`), categoryId, total })
            res.status(200).json(resultado)
        } catch (error: any) {
            res.status(400).json({ erro: error.message })
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const dadosValidados = await deleteExpenseSchema().validate({ ...req.body, ...req.params }, { stripUnknown: true })
            const expenseService = ExpensesFactory()

            const { id } = dadosValidados
            const resultado = await expenseService.delete(id)
            res.status(200).json(resultado)
        } catch (error: any) {
            res.status(400).json({ erro: error.message })
        }
    }
}