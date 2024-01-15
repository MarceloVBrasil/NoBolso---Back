import { v4 as uuidV4 } from "uuid"

import { IExpense } from "../models/Expenses";
import { IExpenseRepository } from "../repository/interfaces/IExpenseRepository";
import { CategoryFactory } from "./factories/CategoryFactory";
import { formatMonthlyGroupedData } from "./helpers/ExpensesRevenuesHelper";

export class ExpensesService {
    constructor(private expenseRepository: IExpenseRepository) { }

    async getTotalGroupedByDate(userId: string, startDate: Date, endDate: Date) {
        if (endDate < startDate) throw new Error('endDate deve ser posterior a startDate')

        const expenses = await this.expenseRepository.getTotalGroupedByDate(userId, startDate, endDate)
        return expenses
    }

    async getByMonthGroupedByCategory(userId: string, month: number, year: number) {
        const categoryService = CategoryFactory()

        const expenses = await this.expenseRepository.getByMonthGroupedByCategory(userId, month, year)
        const categories = await categoryService.getAll(userId)

        return formatMonthlyGroupedData(categories, expenses)
    }

    async getByMonthIndividually(userId: string, month: number, year: number) {
        return await this.expenseRepository.getByMonthIndividually(userId, month, year)
    }

    async add(data: IExpense) {
        const categoriaService = CategoryFactory()

        const seCategoriaValida = await categoriaService.getById(data.categoryId)
        if (!seCategoriaValida) throw new Error(`Categoria inválida`)

        data.id = uuidV4()
        data.createdAt = new Date()
        data.updatedAt = new Date()

        return await this.expenseRepository.add(data)
    }

    async update(id: string, data: IExpense) {
        const categoriaService = CategoryFactory()

        const seCategoriaValida = await categoriaService.getById(data.categoryId)
        if (!seCategoriaValida) throw new Error('Categoria inválida')
        data.updatedAt = new Date()

        return this.expenseRepository.update(id, data)
    }

    async delete(expenseId: string) {
        return await this.expenseRepository.delete(expenseId)
    }
}