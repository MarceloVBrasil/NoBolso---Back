import { CategoriaTipo, ICategory } from "../../models/Category";
import { ICategoryRepository, IGetAllCategories } from "../interfaces/ICategoryRepository";

export class InMemoryCategoryRepository implements ICategoryRepository {
    private _cetegories: ICategory[] = [
        {
            id: 'a522eab3-b485-4bc0-9a8c-0b9490e72890',
            userId: 'dfd5d673-a960-4a76-9fb2-5a71ceae796f',
            nome: 'Supermercado',
            tipo: 'gasto',
            meta: 1550,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: 'f0272e66-2da7-4af1-a5c1-02b85be71329',
            userId: 'dfd5d673-a960-4a76-9fb2-5a71ceae796f',
            nome: 'Transporte',
            tipo: 'gasto',
            meta: 700,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: '724bb093-31ab-42c9-a101-30b2b6fb73d2',
            userId: 'dfd5d673-a960-4a76-9fb2-5a71ceae796f',
            nome: 'Saúde',
            tipo: 'gasto',
            meta: 700,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: '8a2b3c43-23e6-4037-a48e-9a81ffd5010c',
            userId: 'dfd5d673-a960-4a76-9fb2-5a71ceae796f',
            nome: 'Internet',
            tipo: 'gasto',
            meta: 200,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: 'ed4053c9-ab66-4c1a-a24b-1ad846039914',
            userId: 'dfd5d673-a960-4a76-9fb2-5a71ceae796f',
            nome: 'Celular',
            tipo: 'gasto',
            meta: 300,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: 'aa4f1e80-a0d4-458e-9079-954954947362',
            userId: 'dfd5d673-a960-4a76-9fb2-5a71ceae796f',
            nome: 'Aluguel',
            tipo: 'gasto',
            meta: 2000,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: '64054d22-d594-429c-982b-542d4342b14b',
            userId: 'dfd5d673-a960-4a76-9fb2-5a71ceae796f',
            nome: 'Programação',
            tipo: 'receita',
            meta: 0,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: 'f7a425f5-6152-40a5-afb3-e38ce671c330',
            userId: 'dfd5d673-a960-4a76-9fb2-5a71ceae796f',
            nome: 'Mesada',
            tipo: 'receita',
            meta: 0,
            createdAt: new Date(),
            updatedAt: new Date()
        },
    ]
    constructor() { }

    async getById(categoryId: string): Promise<ICategory | null> {
        return this._cetegories.find(c => c.id == categoryId)!
    }

    async getAll(userId: string): Promise<IGetAllCategories[]> {
        return this._cetegories.filter(category => category.userId == userId).map(category => { return { id: category.id as string, nome: category.nome, meta: category.meta, tipo: category.tipo } }).sort((categoryA, categoryB) => categoryA.meta - categoryB.meta)
    }

    async getByTipo(userId: string, tipo: string): Promise<ICategory[]> {
        return this._cetegories.filter(category => category.userId == userId && category.tipo == tipo)
    }

    async checkExistence(nome: string, tipo: CategoriaTipo): Promise<boolean> {
        return !!this._cetegories.find(_category => _category.nome == nome && _category.tipo == tipo)
    }

    async add(category: ICategory): Promise<ICategory> {
        this._cetegories.push(category)
        return category
    }

    async update(categoyId: string, category: ICategory): Promise<ICategory> {
        const categoryIndex = this._cetegories.findIndex(category => category.id == categoyId)
        const categoryId = this._cetegories[categoryIndex].id
        this._cetegories[categoryIndex] = { id: categoryId, ...category }
        return category
    }

    async delete(categoryId: string): Promise<string> {
        this._cetegories = this._cetegories.filter(category => category.id != categoryId)
        return categoryId
    }
}