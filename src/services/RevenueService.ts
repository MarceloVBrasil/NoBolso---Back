import { v4 as uuidV4 } from "uuid"

import { IRevenue } from "../models/Revenue";
import { IRevenueRepository } from "../repository/interfaces/IRevenueRepository";
import { CategoryFactory } from "./factories/CategoryFactory";
import { formatMonthlyGroupedData } from "./helpers/ExpensesRevenuesHelper";

export class RevenueService {
    constructor(private revenueRepository: IRevenueRepository) {

    }

    async getTotalGroupedByDate(userId: string, startDate: Date, endDate: Date) {
        if (endDate < startDate) throw new Error('endDate deve ser posterior a startDate')

        return await this.revenueRepository.getTotalGroupedByDate(userId, startDate, endDate)
    }

    async getByMonthGroupedByCategory(userId: string, month: number, year: number) {
        const categoriesService = CategoryFactory()
        const revenues = await this.revenueRepository.getByMonthGroupedByCategory(userId, month, year)
        const categories = await categoriesService.getAll(userId)
        return formatMonthlyGroupedData(categories, revenues)
    }

    async getByMonthIndividually(userId: string, month: number, year: number) {
        return await this.revenueRepository.getByMonthIndividually(userId, month, year)
    }

    async add(data: IRevenue) {
        const categoriaService = CategoryFactory()

        const seCategoriaValida = await categoriaService.getById(data.categoryId)
        if (!seCategoriaValida) throw new Error(`Categoria inválida`)

        data.id = uuidV4()
        data.createdAt = new Date()
        data.updatedAt = new Date()

        return await this.revenueRepository.add(data)
    }

    async update(id: string, data: IRevenue) {
        const categoriaService = CategoryFactory()

        const seCategoriaValida = await categoriaService.getById(data.categoryId)
        if (!seCategoriaValida) throw new Error(`Categoria inválida`)
        data.updatedAt = new Date()

        return await this.revenueRepository.update(id, data)
    }

    async delete(id: string) {
        return await this.revenueRepository.delete(id)
    }
}