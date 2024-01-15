import { IExpense } from "../../models/Expenses";
import { IRevenue } from "../../models/Revenue"

function formatMonthlyGroupedData(categories: { nome: string, meta: number, id: string }[], data: { sum: number, categoryId: string }[]) {
    const result: { total: number, categoria: string, meta: number, id: string }[] = []
    data.forEach(d => result.push({ total: d.sum, categoria: categories.find(category => category.id == d.categoryId)!.nome, meta: categories.find(category => category.id == d.categoryId)!.meta, id: d.categoryId }))

    return result
}

function formatMonthlyIndividuallyData(data: { id: string, category: { nome: string }, total: number }[]) {
    return data.map(d => { return { id: d.id, total: d.total, categoria: d.category.nome } })
}

function filterKeysByDate(dataGroupedByDate: { [date: string]: IExpense[] | IRevenue[] }, startDate: Date, endDate: Date) {
    const allKeys = Object.keys(dataGroupedByDate)
    const filteredKeys = allKeys.filter(key => endDate >= new Date(key) && startDate <= new Date(key))

    return filteredKeys
}

export { formatMonthlyGroupedData, formatMonthlyIndividuallyData, filterKeysByDate }