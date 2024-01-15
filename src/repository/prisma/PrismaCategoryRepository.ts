import { PrismaClient } from "@prisma/client"

import { CategoriaTipo, ICategory } from "../../models/Category"
import { ICategoryRepository, IGetAllCategories } from "../interfaces/ICategoryRepository"

export class PrismaCategoryRepository implements ICategoryRepository {
    private prisma: PrismaClient = new PrismaClient()

    constructor() { }

    async getById(categoryId: string): Promise<ICategory | null> {
        return this.prisma.category.findUnique({ where: { id: categoryId } })
    }

    async getAll(userId: string): Promise<IGetAllCategories[]> {
        return this.prisma.category.findMany({ where: { userId }, select: { nome: true, meta: true, id: true, tipo: true }, orderBy: { meta: 'asc' } })
    }

    async getByTipo(userId: string, tipo: string): Promise<ICategory[]> {
        return await this.prisma.category.findMany({ where: { AND: [{ userId }, { tipo }] } })
    }

    async checkExistence(nome: string, tipo: CategoriaTipo): Promise<boolean> {
        return !!await this.prisma.category.findFirst({ where: { AND: [{ nome }, { tipo }] } })
    }

    async add(categoria: ICategory) {
        return await this.prisma.category.create({ data: categoria })
    }

    async update(categoyId: string, category: ICategory): Promise<ICategory> {
        return await this.prisma.category.update({ where: { id: categoyId }, data: { ...category } })
    }
    async delete(categoryId: string): Promise<string> {
        return (await this.prisma.category.delete({ where: { id: categoryId } })).id
    }
}