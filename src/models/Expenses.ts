export interface IExpense {
    id?: string
    userId: string
    categoryId: string
    total: number
    data: Date
    createdAt?: Date
    updatedAt?: Date
}