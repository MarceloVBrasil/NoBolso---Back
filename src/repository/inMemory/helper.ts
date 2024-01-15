import { ICategory } from "../../models/Category"
import { IExpense } from "../../models/Expenses"
import { IRevenue } from "../../models/Revenue"
import { CategoryFactory } from "../../services/factories/CategoryFactory"
import { IGetByMonthGroupedByCategory, IGetByMonthIndividually, IGetTotalGroupedByDate } from "../interfaces/IMethods"

function getMonth(date: string): string {

    const [dayWeek, month, day, year] = date.split(' ')

    return month
}

function getYear(date: string) {
    const [dayWeek, month, day, year] = date.split(' ')

    return parseInt(year)
}

function getMonthName(date: string) {
    const mes = getMonth(date)
    switch (mes) {
        case 'Jan':
            return 'Janeiro'
        case 'Feb':
            return 'Fevereiro'
        case 'Mar':
            return 'Março'
        case 'Apr':
            return 'Abril'
        case 'May':
            return 'Maio'
        case 'Jun':
            return 'Junho'
        case 'Jul':
            return 'Julho'
        case 'Aug':
            return 'Agosto'
        case 'Sep':
            return 'Setembro'
        case 'Oct':
            return 'Outubro'
        case 'Nov':
            return 'Novembro'
        case 'Dec':
            return 'Dezembro'
    }
}

function inMemory_formatYearlyData(dataset: { sum: { total: number }, data: string }[]) {
    const result: IGetTotalGroupedByDate[] = []

    dataset.forEach(datum => result.push({ ano: getYear(datum.data), mes: getMonthName(datum.data) as string, total: datum.sum.total }))
    return result
}

function inMemory_formatSumCategoryId(filteredKeys: string[], dataGroupedByDate: { [date: string]: IExpense[] | IRevenue[] }) {
    const result: IGetByMonthGroupedByCategory[] = []
    filteredKeys.forEach((key: string) => {
        result.push({ sum: dataGroupedByDate[key].reduce((total: number, curr: IExpense) => total + curr.total, 0) as number, categoryId: key })
    })
    return result
}

function inMemory_formatMonthlyIndividuallyData(data: {
    id: string;
    category: {
        nome: string;
    };
    total: number;
}[]) {
    const result: IGetByMonthIndividually[] = data.map(d => { return { id: d.id, total: d.total, categoria: d.category.nome } })
    return result
}

function inMemory_formatSumData(filteredKeys: string[], dataGroupedByDate: { [date: string]: IExpense[] | IRevenue[] }) {
    const result: any[] = []
    filteredKeys.forEach((key: string) => {
        result.push({ sum: { total: (dataGroupedByDate[key]).reduce((total: number, curr: IExpense) => total + curr.total, 0) as number }, data: key })
    })
    return result
}

async function inMemory_replaceCategoryIdByCategoryName(dataset: (IExpense & { category?: string })[] | (IRevenue & { category?: string })[]) {
    const categoryFactory = CategoryFactory()
    const categories: ICategory[] = []
    for (let data of dataset) {
        const category = await categoryFactory.getById(data.categoryId)
        if (!!category) categories.push(category)
    }

    dataset.forEach(data => {
        data.category = categories.find(c => c.id == data.categoryId)?.nome || data.categoryId
    })
    return dataset
}


export { inMemory_formatYearlyData, inMemory_formatSumCategoryId, inMemory_formatMonthlyIndividuallyData, inMemory_formatSumData, inMemory_replaceCategoryIdByCategoryName }