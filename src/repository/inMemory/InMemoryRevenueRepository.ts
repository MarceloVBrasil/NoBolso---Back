import { IRevenue } from "../../models/Revenue"
import { filterKeysByDate } from "../../services/helpers/ExpensesRevenuesHelper"
import { groupBy } from "../../utils/functions"
import { IGetByMonthGroupedByCategory, IGetByMonthIndividually, IGetTotalGroupedByDate } from "../interfaces/IMethods"
import { IRevenueRepository } from "../interfaces/IRevenueRepository"
import { inMemory_formatMonthlyIndividuallyData, inMemory_formatSumCategoryId, inMemory_formatSumData, inMemory_formatYearlyData, inMemory_replaceCategoryIdByCategoryName } from "./helper"

export class InMemoryRevenueRepository implements IRevenueRepository {
    private _revenues: IRevenue[] = []
    constructor() {
        this._revenues = [
            {
                id: 'c0a3d071-4d80-4e8f-8b61-79a3ef921524',
                userId: 'dfd5d673-a960-4a76-9fb2-5a71ceae796f',
                categoryId: '64054d22-d594-429c-982b-542d4342b14b',
                total: 5000,
                data: new Date('01/01/2023'),
                createdAt: new Date('01/01/2023'),
                updatedAt: new Date('01/01/2023')
            },
            {
                id: '95e24c2c-14d6-43de-8ec9-4fdfe13c6214',
                userId: 'dfd5d673-a960-4a76-9fb2-5a71ceae796f',
                categoryId: 'f7a425f5-6152-40a5-afb3-e38ce671c330',
                total: 3000,
                data: new Date('01/01/2023'),
                createdAt: new Date('01/01/2023'),
                updatedAt: new Date('01/01/2023')
            },

            {
                id: '2a63b398-031f-4e93-87fc-a8ccc5293dc0',
                userId: 'dfd5d673-a960-4a76-9fb2-5a71ceae796f',
                categoryId: '64054d22-d594-429c-982b-542d4342b14b',
                total: 5000,
                data: new Date('02/01/2023'),
                createdAt: new Date('02/01/2023'),
                updatedAt: new Date('02/01/2023')
            },
            {
                id: 'eb1f4744-6f17-47c0-8cdd-e324e19a9f47',
                userId: 'dfd5d673-a960-4a76-9fb2-5a71ceae796f',
                categoryId: 'f7a425f5-6152-40a5-afb3-e38ce671c330',
                total: 4000,
                data: new Date('02/01/2023'),
                createdAt: new Date('02/01/2023'),
                updatedAt: new Date('02/01/2023')
            },

            {
                id: 'd979b7c1-f919-4035-b741-347a6c5173d3',
                userId: 'dfd5d673-a960-4a76-9fb2-5a71ceae796f',
                categoryId: '64054d22-d594-429c-982b-542d4342b14b',
                total: 5000,
                data: new Date('03/01/2023'),
                createdAt: new Date('03/01/2023'),
                updatedAt: new Date('03/01/2023')
            },
            {
                id: 'c600291d-af5b-4f6b-ab13-314e6258b420',
                userId: 'dfd5d673-a960-4a76-9fb2-5a71ceae796f',
                categoryId: 'f7a425f5-6152-40a5-afb3-e38ce671c330',
                total: 3000,
                data: new Date('03/01/2023'),
                createdAt: new Date('03/01/2023'),
                updatedAt: new Date('03/01/2023')
            },

            {
                id: '4806ef1b-0248-4b1a-a674-3fcfa286a3f8',
                userId: 'dfd5d673-a960-4a76-9fb2-5a71ceae796f',
                categoryId: '64054d22-d594-429c-982b-542d4342b14b',
                total: 5000,
                data: new Date('04/01/2023'),
                createdAt: new Date('04/01/2023'),
                updatedAt: new Date('04/01/2023')
            },
            {
                id: '0db0ac07-d5b2-4b42-8a76-ae6d61c6090e',
                userId: 'dfd5d673-a960-4a76-9fb2-5a71ceae796f',
                categoryId: 'f7a425f5-6152-40a5-afb3-e38ce671c330',
                total: 4000,
                data: new Date('04/01/2023'),
                createdAt: new Date('04/01/2023'),
                updatedAt: new Date('04/01/2023')
            },

            {
                id: '1a8cc044-4c88-464c-8124-2520f37bb3c5',
                userId: 'dfd5d673-a960-4a76-9fb2-5a71ceae796f',
                categoryId: '64054d22-d594-429c-982b-542d4342b14b',
                total: 5000,
                data: new Date('05/01/2023'),
                createdAt: new Date('05/01/2023'),
                updatedAt: new Date('05/01/2023')
            },
            {
                id: '1a8cc044-4c88-464c-8124-2520f37bb3c5',
                userId: 'dfd5d673-a960-4a76-9fb2-5a71ceae796f',
                categoryId: 'f7a425f5-6152-40a5-afb3-e38ce671c330',
                total: 3000,
                data: new Date('05/01/2023'),
                createdAt: new Date('05/01/2023'),
                updatedAt: new Date('05/01/2023')
            },

            {
                id: 'ae51723b-d1a4-4eb5-81bf-3bc17deabc8a',
                userId: 'dfd5d673-a960-4a76-9fb2-5a71ceae796f',
                categoryId: '64054d22-d594-429c-982b-542d4342b14b',
                total: 5000,
                data: new Date('06/01/2023'),
                createdAt: new Date('06/01/2023'),
                updatedAt: new Date('06/01/2023')
            },
            {
                id: 'e3204e84-62db-41e5-b365-99a0db196e92',
                userId: 'dfd5d673-a960-4a76-9fb2-5a71ceae796f',
                categoryId: 'f7a425f5-6152-40a5-afb3-e38ce671c330',
                total: 4000,
                data: new Date('06/01/2023'),
                createdAt: new Date('06/01/2023'),
                updatedAt: new Date('06/01/2023')
            },

            {
                id: '7b8eeedc-04dd-42cb-b269-8438b4826bf3',
                userId: 'dfd5d673-a960-4a76-9fb2-5a71ceae796f',
                categoryId: '64054d22-d594-429c-982b-542d4342b14b',
                total: 5000,
                data: new Date('07/01/2023'),
                createdAt: new Date('07/01/2023'),
                updatedAt: new Date('07/01/2023')
            },
            {
                id: '2c512694-9562-46dc-b9a1-11aaea455dde',
                userId: 'dfd5d673-a960-4a76-9fb2-5a71ceae796f',
                categoryId: 'f7a425f5-6152-40a5-afb3-e38ce671c330',
                total: 3000,
                data: new Date('07/01/2023'),
                createdAt: new Date('07/01/2023'),
                updatedAt: new Date('07/01/2023')
            },

            {
                id: 'd026b772-f7d1-4fd6-a9b9-4a783f068364',
                userId: 'dfd5d673-a960-4a76-9fb2-5a71ceae796f',
                categoryId: '64054d22-d594-429c-982b-542d4342b14b',
                total: 5000,
                data: new Date('08/01/2023'),
                createdAt: new Date('08/01/2023'),
                updatedAt: new Date('08/01/2023')
            },
            {
                id: '232bbf67-5ff2-47ba-9284-2439263e1e72',
                userId: 'dfd5d673-a960-4a76-9fb2-5a71ceae796f',
                categoryId: 'f7a425f5-6152-40a5-afb3-e38ce671c330',
                total: 4000,
                data: new Date('08/01/2023'),
                createdAt: new Date('08/01/2023'),
                updatedAt: new Date('08/01/2023')
            },

            {
                id: '34e341b4-eda5-4ef7-aade-5728edd53d10',
                userId: 'dfd5d673-a960-4a76-9fb2-5a71ceae796f',
                categoryId: '64054d22-d594-429c-982b-542d4342b14b',
                total: 5000,
                data: new Date('09/01/2023'),
                createdAt: new Date('09/01/2023'),
                updatedAt: new Date('09/01/2023')
            },
            {
                id: '26ecf48e-f324-48c0-93a4-a61d5c285b57',
                userId: 'dfd5d673-a960-4a76-9fb2-5a71ceae796f',
                categoryId: 'f7a425f5-6152-40a5-afb3-e38ce671c330',
                total: 3000,
                data: new Date('09/01/2023'),
                createdAt: new Date('09/01/2023'),
                updatedAt: new Date('09/01/2023')
            },

            {
                id: '53f8d5ff-08da-4bf3-8239-b9f70c8ad54c',
                userId: 'dfd5d673-a960-4a76-9fb2-5a71ceae796f',
                categoryId: '64054d22-d594-429c-982b-542d4342b14b',
                total: 5000,
                data: new Date('10/01/2023'),
                createdAt: new Date('10/01/2023'),
                updatedAt: new Date('10/01/2023')
            },
            {
                id: '489485d2-87a1-4afe-8e40-5cc5b759abf0',
                userId: 'dfd5d673-a960-4a76-9fb2-5a71ceae796f',
                categoryId: 'f7a425f5-6152-40a5-afb3-e38ce671c330',
                total: 4000,
                data: new Date('10/01/2023'),
                createdAt: new Date('10/01/2023'),
                updatedAt: new Date('10/01/2023')
            },
            {
                id: '8aa46071-d398-4216-91a2-96f72b17bc50',
                userId: 'dfd5d673-a960-4a76-9fb2-5a71ceae796f',
                categoryId: '64054d22-d594-429c-982b-542d4342b14b',
                total: 5000,
                data: new Date('11/01/2023'),
                createdAt: new Date('11/01/2023'),
                updatedAt: new Date('11/01/2023')
            },
            {
                id: '274d3af4-b327-41c4-a5f0-c3cc3e42e0af',
                userId: 'dfd5d673-a960-4a76-9fb2-5a71ceae796f',
                categoryId: 'f7a425f5-6152-40a5-afb3-e38ce671c330',
                total: 3000,
                data: new Date('11/01/2023'),
                createdAt: new Date('11/01/2023'),
                updatedAt: new Date('11/01/2023')
            },
            {
                id: '152a48d3-c9e0-443a-8152-8455bf1c922e',
                userId: 'dfd5d673-a960-4a76-9fb2-5a71ceae796f',
                categoryId: '64054d22-d594-429c-982b-542d4342b14b',
                total: 5000,
                data: new Date('12/01/2023'),
                createdAt: new Date('12/01/2023'),
                updatedAt: new Date('12/01/2023')
            },
            {
                id: 'fd175d4a-2f63-4dd9-bd3e-a003f4485c14',
                userId: 'dfd5d673-a960-4a76-9fb2-5a71ceae796f',
                categoryId: 'f7a425f5-6152-40a5-afb3-e38ce671c330',
                total: 4000,
                data: new Date('12/01/2023'),
                createdAt: new Date('12/01/2023'),
                updatedAt: new Date('12/01/2023')
            },

        ]
    }

    async getTotalGroupedByDate(userId: string, startDate: Date, endDate: Date): Promise<IGetTotalGroupedByDate[]> {
        const revenuesGroupedByData: any = groupBy(this._revenues.filter(r => r.userId == userId), 'data')
        const filteredKeys = filterKeysByDate(revenuesGroupedByData, startDate, endDate)

        const result = inMemory_formatSumData(filteredKeys, revenuesGroupedByData)
        return inMemory_formatYearlyData(result)
    }

    async getByMonthIndividually(userId: string, month: number, year: number): Promise<IGetByMonthIndividually[]> {
        const revenues = this._revenues.filter(r => r.userId == userId && r.data < new Date(`${year}-${month}-28`) && r.data >= new Date(`${year}-${month}-01`)).sort((revenueA, revenueB) => revenueA.total - revenueB.total)

        const expensesWithCategoryName = await inMemory_replaceCategoryIdByCategoryName(revenues)

        const result = expensesWithCategoryName.map(e => { return { id: e.id || '', category: { nome: e.category as string }, total: e.total } })
        return inMemory_formatMonthlyIndividuallyData(result)
    }

    async getByMonthGroupedByCategory(userId: string, month: number, year: number): Promise<IGetByMonthGroupedByCategory[]> {
        const revenuesGroupedByData: any = groupBy(this._revenues.filter(e => e.userId == userId), 'data')
        const filteredKeys = filterKeysByDate(revenuesGroupedByData, new Date(`${year}-${month}-01`), new Date(`${year}-${month}-28`))

        const filteredData: IRevenue[] = []
        filteredKeys.forEach(key => revenuesGroupedByData[key].forEach((item: IRevenue) => filteredData.push(item)))

        const groupedByCategory = groupBy(filteredData, 'categoryId')
        const categoryKeys = Object.keys(groupedByCategory)
        const result = inMemory_formatSumCategoryId(categoryKeys, groupedByCategory)
        return result
    }

    async add(revenue: IRevenue): Promise<IRevenue> {
        this._revenues.push(revenue)
        return revenue
    }

    async update(revenueId: string, revenue: IRevenue): Promise<IRevenue> {
        const revenueIndex = this._revenues.findIndex(revenue => revenue.id == revenueId)
        this._revenues[revenueIndex] = { id: revenueId, ...revenue }

        return revenue
    }

    async delete(revenueId: string): Promise<string> {
        this._revenues = this._revenues.filter(revenue => revenue.id != revenueId)

        return revenueId
    }
}