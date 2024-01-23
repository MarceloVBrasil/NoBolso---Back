import { PrismaClient } from "@prisma/client"

import { CategoriaTipo, ICategory } from "../../models/Category"
import { ICategoryRepository, IGetAllCategories } from "../interfaces/ICategoryRepository"

export class PrismaCategoryRepository implements ICategoryRepository {
    private prisma: PrismaClient = new PrismaClient()

    constructor() { }

    async getById(categoryId: string): Promise<ICategory | null> {
        const category = await this.prisma.category.findUniqueOrThrow({ where: { id: categoryId } })

        return { ...category, tipo: category.tipo as CategoriaTipo }
    }

    async getAll(userId: string): Promise<IGetAllCategories[]> {
        const categories = await this.prisma.category.findMany({ where: { userId }, select: { nome: true, meta: true, id: true, tipo: true }, orderBy: { meta: 'asc' } })
        const fcategories = categories.map(c => { return { ...c, tipo: c.tipo as CategoriaTipo } })

        return fcategories
    }

    async getByTipo(userId: string, tipo: string): Promise<ICategory[]> {
        const categories = await this.prisma.category.findMany({ where: { AND: [{ userId }, { tipo }] } })
        const fcategories = categories.map(c => { return { ...c, tipo: c.tipo as CategoriaTipo } })

        return fcategories
    }

    async checkExistence(nome: string, tipo: CategoriaTipo): Promise<boolean> {
        return !!await this.prisma.category.findFirst({ where: { AND: [{ nome }, { tipo }] } })
    }

    async add(categoria: ICategory) {
        const category = await this.prisma.category.create({ data: categoria })

        return { ...category, tipo: category.tipo as CategoriaTipo }
    }

    async update(categoyId: string, category: ICategory): Promise<ICategory> {
        const updatedCategory = await this.prisma.category.update({ where: { id: categoyId }, data: { ...category } })

        return { ...updatedCategory, tipo: updatedCategory.tipo as CategoriaTipo }
    }
    async delete(categoryId: string): Promise<string> {
        return (await this.prisma.category.delete({ where: { id: categoryId } })).id
    }
}