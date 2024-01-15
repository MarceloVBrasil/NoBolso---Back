import { v4 as uuidV4 } from "uuid"

import { CategoriaTipo, ICategory } from "../models/Category";
import { ICategoryRepository } from "../repository/interfaces/ICategoryRepository";

export class CategoryService {
    constructor(private categoryRepository: ICategoryRepository) { }

    async getAll(userId: string) {
        return await this.categoryRepository.getAll(userId)
    }

    async getByTipo(userId: string, tipo: CategoriaTipo) {
        return await this.categoryRepository.getByTipo(userId, tipo)
    }

    async getById(categoryId: string) {
        return await this.categoryRepository.getById(categoryId)
    }

    async checkExistence(nome: string, tipo: CategoriaTipo) {
        return await this.categoryRepository.checkExistence(nome, tipo)
    }

    async add(data: ICategory) {
        if (data.tipo == 'receita') data.meta = 0

        const seExistecategoria = await this.categoryRepository.checkExistence(data.nome, data.tipo)
        if (seExistecategoria) throw new Error('categoria já existente')

        const category = { ...data, id: uuidV4(), createdAt: new Date(), updatedAt: new Date() }
        return await this.categoryRepository.add(category)
    }

    async update(id: string, data: ICategory) {
        const seCategoriaExiste = await this.categoryRepository.getById(id)
        if (!seCategoriaExiste) throw new Error('categoria inexistente')

        if (data.tipo == 'receita') data.meta = 0
        data.updatedAt = new Date()

        return await this.categoryRepository.update(id, data)
    }

    async delete(id: string) {
        return await this.categoryRepository.delete(id)
    }
}