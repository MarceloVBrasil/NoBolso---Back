export interface IRevenue {
    id?: string
    userId: string
    categoryId: string
    total: number
    data: Date
    createdAt?: Date
    updatedAt?: Date
}