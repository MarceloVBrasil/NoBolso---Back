import { PrismaClient } from "@prisma/client"

import { IExpense } from "../../models/Expenses"
import { IExpenseRepository } from "../interfaces/IExpenseRepository"
import { prisma_formatMonthlyIndividuallyData, prisma_formatSumCategoryId, prisma_formatYearlyData } from "./helper"
import { IGetByMonthGroupedByCategory, IGetByMonthIndividually, IGetTotalGroupedByDate } from "../interfaces/IMethods"

export class PrismaExpensesRepository implements IExpenseRepository {
    private prisma: PrismaClient = new PrismaClient()

    constructor() { }

    async getTotalGroupedByDate(userId: string, startDate: Date, endDate: Date): Promise<IGetTotalGroupedByDate[]> {
        const expenses = await this.prisma.expense.groupBy({
            by: ['data'],
            where: { userId, AND: [{ data: { lte: endDate, gte: startDate } }] },
            _sum: { total: true }
        })

        return prisma_formatYearlyData(expenses)
    }

    async getByMonthIndividually(userId: string, month: number, year: number): Promise<IGetByMonthIndividually[]> {
        const expenses = await this.prisma.expense.findMany({
            select: { id: true, category: { select: { nome: true } }, total: true },
            where: { userId, AND: [{ data: { lte: new Date(`${year}/${month}/28`), gte: new Date(`${year}/${month}/01`) } }] },
            orderBy: { categoryId: 'asc' }
        })

        return prisma_formatMonthlyIndividuallyData(expenses)
    }

    async getByMonthGroupedByCategory(userId: string, month: number, year: number): Promise<IGetByMonthGroupedByCategory[]> {
        const expenses = await this.prisma.expense.groupBy({
            by: ['categoryId'],
            where: { userId, AND: [{ data: { lte: new Date(`${year}/${month}/28`), gte: new Date(`${year}/${month}/01`) } }] },
            _sum: { total: true },
        })

        return prisma_formatSumCategoryId(expenses)
    }

    async add(expense: IExpense): Promise<IExpense> {
        await this.prisma.expense.create({ data: { ...expense } })
        return expense
    }

    async update(expenseId: string, expense: IExpense): Promise<IExpense> {
        return await this.prisma.expense.update({ where: { id: expenseId }, data: { ...expense } })
    }

    async delete(expenseId: string): Promise<string> {
        await this.prisma.expense.delete({ where: { id: expenseId } })
        return expenseId
    }
}