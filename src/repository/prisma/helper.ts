import { Prisma } from "@prisma/client"
import { IGetByMonthGroupedByCategory, IGetByMonthIndividually, IGetTotalGroupedByDate } from "../interfaces/IMethods"

function getMonth(date: Date): number {
    return date.getMonth() + 1
}

function getYear(date: Date): number {
    return date.getFullYear()
}

function getMonthName(date: Date) {
    const mes = getMonth(date)
    switch (mes) {
        case 1:
            return 'Janeiro'
        case 2:
            return 'Fevereiro'
        case 3:
            return 'Março'
        case 4:
            return 'Abril'
        case 5:
            return 'Maio'
        case 6:
            return 'Junho'
        case 7:
            return 'Julho'
        case 8:
            return 'Agosto'
        case 9:
            return 'Setembro'
        case 10:
            return 'Outubro'
        case 11:
            return 'Novembro'
        case 12:
            return 'Dezembro'
    }
}

function prisma_formatYearlyData(dataset: (Prisma.PickEnumerable<Prisma.ExpenseGroupByOutputType, "data"[]> & {
    _sum: {
        total: number | null;
    };
})[]) {
    const result: IGetTotalGroupedByDate[] = []

    dataset.forEach(datum => result.push({ ano: getYear(datum.data), mes: getMonthName(datum.data) as string, total: datum._sum.total || 0 }))
    return result
}

function prisma_formatSumCategoryId(dataset: (Prisma.PickEnumerable<Prisma.ExpenseGroupByOutputType, "categoryId"[]> & {
    _sum: {
        total: number | null;
    };
})[]) {
    const result: IGetByMonthGroupedByCategory[] = dataset.map(data => { return { sum: data._sum.total as number, categoryId: data.categoryId } })
    return result
}

function prisma_formatMonthlyIndividuallyData(data: { id: string, category: { nome: string }, total: number }[]) {
    const result: IGetByMonthIndividually[] = data.map(d => { return { id: d.id, total: d.total, categoria: d.category.nome } })
    return result
}

export { prisma_formatYearlyData, prisma_formatSumCategoryId, prisma_formatMonthlyIndividuallyData }