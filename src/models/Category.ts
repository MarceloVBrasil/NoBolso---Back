export interface ICategory {
    id?: string
    userId: string
    nome: string
    tipo: CategoriaTipo
    meta: number
    createdAt?: Date
    updatedAt?: Date
}

export type CategoriaTipo = "gasto" | "receita"