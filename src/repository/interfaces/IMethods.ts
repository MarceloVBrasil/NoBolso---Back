export interface IGetTotalGroupedByDate {
    mes: string
    ano: number
    total: number
}

export interface IGetByMonthIndividually {
    id: string
    total: number
    categoria: string
}

export interface IGetByMonthGroupedByCategory {
    sum: number
    categoryId: string
}