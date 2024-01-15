import { CategoriaTipo, ICategory } from "../../models/Category";

export interface ICategoryRepository {
    getAll(userId: string): Promise<IGetAllCategories[]>
    getByTipo(userId: string, tipo: string): Promise<ICategory[]>
    getById(categoryId: string): Promise<ICategory | null>
    checkExistence(category: string, tipo: CategoriaTipo): Promise<boolean>
    add(category: ICategory): Promise<ICategory>
    update(categoyId: string, category: ICategory): Promise<ICategory>
    delete(categoryId: string): Promise<string>
}

export interface IGetAllCategories {
    nome: string
    meta: number
    id: string
    tipo: CategoriaTipo
}