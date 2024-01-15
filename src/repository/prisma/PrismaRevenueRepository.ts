import { PrismaClient } from "@prisma/client"

import { IRevenue } from "../../models/Revenue"
import { IRevenueRepository } from "../interfaces/IRevenueRepository"
import { prisma_formatMonthlyIndividuallyData, prisma_formatSumCategoryId, prisma_formatYearlyData } from "./helper"
import { IGetByMonthGroupedByCategory, IGetByMonthIndividually, IGetTotalGroupedByDate } from "../interfaces/IMethods"

export class PrismaRevenueRepository implements IRevenueRepository {
    private prisma: PrismaClient = new PrismaClient()

    constructor() { }

    async getTotalGroupedByDate(userId: string, startDate: Date, endDate: Date): Promise<IGetTotalGroupedByDate[]> {
        const revenues = await this.prisma.revenue.groupBy({
            by: ['data'],
            where: { userId, AND: [{ data: { gte: startDate, lte: endDate } }] },
            _sum: { total: true }
        })

        return prisma_formatYearlyData(revenues)
    }

    async getByMonthIndividually(userId: string, month: number, year: number): Promise<IGetByMonthIndividually[]> {
        const revenues = await this.prisma.revenue.findMany({
            select: { id: true, category: { select: { nome: true } }, total: true },
            where: { userId, AND: [{ data: { lte: new Date(`${year}/${month}/28`), gte: new Date(`${year}/${month}/01`) } }] },
            orderBy: { categoryId: 'asc' },
        })

        return prisma_formatMonthlyIndividuallyData(revenues)
    }

    async getByMonthGroupedByCategory(userId: string, month: number, year: number): Promise<IGetByMonthGroupedByCategory[]> {
        const revenues = await this.prisma.revenue.groupBy({
            by: ['categoryId'],
            where: { userId, AND: [{ data: { lte: new Date(`${year}/${month}/28`), gte: new Date(`${year}/${month}/01`) } }] },
            _sum: { total: true },
        })

        return prisma_formatSumCategoryId(revenues)
    }

    async add(revenue: IRevenue): Promise<IRevenue> {
        await this.prisma.revenue.create({ data: revenue })
        return revenue
    }

    async update(revenueId: string, revenue: IRevenue): Promise<IRevenue> {
        return await this.prisma.revenue.update({ where: { id: revenueId }, data: revenue })
    }

    async delete(revenueId: string): Promise<string> {
        await this.prisma.revenue.delete({ where: { id: revenueId } })
        return revenueId
    }
}