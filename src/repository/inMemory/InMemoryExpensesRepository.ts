import { IExpense } from "../../models/Expenses";
import { IExpenseRepository } from "../interfaces/IExpenseRepository";

import { groupBy } from "../../utils/functions";
import { filterKeysByDate } from "../../services/helpers/ExpensesRevenuesHelper";
import { inMemory_formatMonthlyIndividuallyData, inMemory_formatSumCategoryId, inMemory_formatSumData, inMemory_formatYearlyData, inMemory_replaceCategoryIdByCategoryName } from "./helper";
import { IGetByMonthGroupedByCategory, IGetByMonthIndividually, IGetTotalGroupedByDate } from "../interfaces/IMethods";

export class InMemoryExpensesRepository implements IExpenseRepository {
    private _expenses: IExpense[] = []
    constructor() {
        this._expenses = [
            {
                id: 'c0a3d071-4d80-4e8f-8b61-79a3ef921524',
                userId: 'dfd5d673-a960-4a76-9fb2-5a71ceae796f',
                categoryId: 'a522eab3-b485-4bc0-9a8c-0b9490e72890',
                total: 1000,
                data: new Date('01-01-2023'),
                createdAt: new Date('01-01-2023'),
                updatedAt: new Date('01-01-2023')
            },
            {
                id: '95e24c2c-14d6-43de-8ec9-4fdfe13c6214',
                userId: 'dfd5d673-a960-4a76-9fb2-5a71ceae796f',
                categoryId: 'aa4f1e80-a0d4-458e-9079-954954947362',
                total: 800,
                data: new Date('01-01-2023'),
                createdAt: new Date('01-01-2023'),
                updatedAt: new Date('01-01-2023')
            },

            {
                id: '2a63b398-031f-4e93-87fc-a8ccc5293dc0',
                userId: 'dfd5d673-a960-4a76-9fb2-5a71ceae796f',
                categoryId: 'a522eab3-b485-4bc0-9a8c-0b9490e72890',
                total: 1000,
                data: new Date('02-02-2023'),
                createdAt: new Date('02-02-2023'),
                updatedAt: new Date('02-02-2023')
            },
            {
                id: 'eb1f4744-6f17-47c0-8cdd-e324e19a9f47',
                userId: 'dfd5d673-a960-4a76-9fb2-5a71ceae796f',
                categoryId: 'aa4f1e80-a0d4-458e-9079-954954947362',
                total: 700,
                data: new Date('02-02-2023'),
                createdAt: new Date('02-02-2023'),
                updatedAt: new Date('02-02-2023')
            },

            {
                id: 'd979b7c1-f919-4035-b741-347a6c5173d3',
                userId: 'dfd5d673-a960-4a76-9fb2-5a71ceae796f',
                categoryId: 'a522eab3-b485-4bc0-9a8c-0b9490e72890',
                total: 1000,
                data: new Date('03-03-2023'),
                createdAt: new Date('03-03-2023'),
                updatedAt: new Date('03-03-2023')
            },
            {
                id: 'c600291d-af5b-4f6b-ab13-314e6258b420',
                userId: 'dfd5d673-a960-4a76-9fb2-5a71ceae796f',
                categoryId: 'aa4f1e80-a0d4-458e-9079-954954947362',
                total: 800,
                data: new Date('03-03-2023'),
                createdAt: new Date('03-03-2023'),
                updatedAt: new Date('03-03-2023')
            },

            {
                id: '4806ef1b-0248-4b1a-a674-3fcfa286a3f8',
                userId: 'dfd5d673-a960-4a76-9fb2-5a71ceae796f',
                categoryId: 'a522eab3-b485-4bc0-9a8c-0b9490e72890',
                total: 1000,
                data: new Date('04-04-2023'),
                createdAt: new Date('04-04-2023'),
                updatedAt: new Date('04-04-2023')
            },
            {
                id: '0db0ac07-d5b2-4b42-8a76-ae6d61c6090e',
                userId: 'dfd5d673-a960-4a76-9fb2-5a71ceae796f',
                categoryId: 'aa4f1e80-a0d4-458e-9079-954954947362',
                total: 700,
                data: new Date('04-04-2023'),
                createdAt: new Date('04-04-2023'),
                updatedAt: new Date('04-04-2023')
            },

            {
                id: '1a8cc044-4c88-464c-8124-2520f37bb3c5',
                userId: 'dfd5d673-a960-4a76-9fb2-5a71ceae796f',
                categoryId: 'a522eab3-b485-4bc0-9a8c-0b9490e72890',
                total: 1000,
                data: new Date('05-05-2023'),
                createdAt: new Date('05-05-2023'),
                updatedAt: new Date('05-05-2023')
            },
            {
                id: '1a8cc044-4c88-464c-8124-2520f37bb3c5',
                userId: 'dfd5d673-a960-4a76-9fb2-5a71ceae796f',
                categoryId: 'aa4f1e80-a0d4-458e-9079-954954947362',
                total: 800,
                data: new Date('05-05-2023'),
                createdAt: new Date('05-05-2023'),
                updatedAt: new Date('05-05-2023')
            },

            {
                id: 'ae51723b-d1a4-4eb5-81bf-3bc17deabc8a',
                userId: 'dfd5d673-a960-4a76-9fb2-5a71ceae796f',
                categoryId: 'a522eab3-b485-4bc0-9a8c-0b9490e72890',
                total: 1000,
                data: new Date('06-06-2023'),
                createdAt: new Date('06-06-2023'),
                updatedAt: new Date('06-06-2023')
            },
            {
                id: 'e3204e84-62db-41e5-b365-99a0db196e92',
                userId: 'dfd5d673-a960-4a76-9fb2-5a71ceae796f',
                categoryId: 'aa4f1e80-a0d4-458e-9079-954954947362',
                total: 700,
                data: new Date('06-06-2023'),
                createdAt: new Date('06-06-2023'),
                updatedAt: new Date('06-06-2023')
            },

            {
                id: '7b8eeedc-04dd-42cb-b269-8438b4826bf3',
                userId: 'dfd5d673-a960-4a76-9fb2-5a71ceae796f',
                categoryId: 'a522eab3-b485-4bc0-9a8c-0b9490e72890',
                total: 1000,
                data: new Date('07-07-2023'),
                createdAt: new Date('07-07-2023'),
                updatedAt: new Date('07-07-2023')
            },
            {
                id: '2c512694-9562-46dc-b9a1-11aaea455dde',
                userId: 'dfd5d673-a960-4a76-9fb2-5a71ceae796f',
                categoryId: 'aa4f1e80-a0d4-458e-9079-954954947362',
                total: 800,
                data: new Date('07-07-2023'),
                createdAt: new Date('07-07-2023'),
                updatedAt: new Date('07-07-2023')
            },

            {
                id: 'd026b772-f7d1-4fd6-a9b9-4a783f068364',
                userId: 'dfd5d673-a960-4a76-9fb2-5a71ceae796f',
                categoryId: 'a522eab3-b485-4bc0-9a8c-0b9490e72890',
                total: 1000,
                data: new Date('08-08-2023'),
                createdAt: new Date('08-08-2023'),
                updatedAt: new Date('08-08-2023')
            },
            {
                id: '232bbf67-5ff2-47ba-9284-2439263e1e72',
                userId: 'dfd5d673-a960-4a76-9fb2-5a71ceae796f',
                categoryId: 'aa4f1e80-a0d4-458e-9079-954954947362',
                total: 700,
                data: new Date('08-08-2023'),
                createdAt: new Date('08-08-2023'),
                updatedAt: new Date('08-08-2023')
            },

            {
                id: '1eb6cd5d-abca-4811-89fb-da9706230e88',
                userId: 'dfd5d673-a960-4a76-9fb2-5a71ceae796f',
                categoryId: 'a522eab3-b485-4bc0-9a8c-0b9490e72890',
                total: 100,
                data: new Date('09-09-2023'),
                createdAt: new Date('09-09-2023'),
                updatedAt: new Date('09-09-2023')
            },
            {
                id: '26ecf48e-f324-48c0-93a4-a61d5c285b57',
                userId: 'dfd5d673-a960-4a76-9fb2-5a71ceae796f',
                categoryId: 'aa4f1e80-a0d4-458e-9079-954954947362',
                total: 800,
                data: new Date('09-09-2023'),
                createdAt: new Date('09-09-2023'),
                updatedAt: new Date('09-09-2023')
            },

            {
                id: '53f8d5ff-08da-4bf3-8239-b9f70c8ad54c',
                userId: 'dfd5d673-a960-4a76-9fb2-5a71ceae796f',
                categoryId: 'a522eab3-b485-4bc0-9a8c-0b9490e72890',
                total: 1000,
                data: new Date('10-10-2023'),
                createdAt: new Date('10-10-2023'),
                updatedAt: new Date('10-10-2023')
            },
            {
                id: '489485d2-87a1-4afe-8e40-5cc5b759abf0',
                userId: 'dfd5d673-a960-4a76-9fb2-5a71ceae796f',
                categoryId: 'aa4f1e80-a0d4-458e-9079-954954947362',
                total: 800,
                data: new Date('10-10-2023'),
                createdAt: new Date('10-10-2023'),
                updatedAt: new Date('10-10-2023')
            },

            {
                id: '8aa46071-d398-4216-91a2-96f72b17bc50',
                userId: 'dfd5d673-a960-4a76-9fb2-5a71ceae796f',
                categoryId: 'a522eab3-b485-4bc0-9a8c-0b9490e72890',
                total: 1000,
                data: new Date('11-11-2023'),
                createdAt: new Date('11-11-2023'),
                updatedAt: new Date('11-11-2023')
            },
            {
                id: '274d3af4-b327-41c4-a5f0-c3cc3e42e0af',
                userId: 'dfd5d673-a960-4a76-9fb2-5a71ceae796f',
                categoryId: 'aa4f1e80-a0d4-458e-9079-954954947362',
                total: 800,
                data: new Date('11-11-2023'),
                createdAt: new Date('11-11-2023'),
                updatedAt: new Date('11-11-2023')
            },

            {
                id: '152a48d3-c9e0-443a-8152-8455bf1c922e',
                userId: 'dfd5d673-a960-4a76-9fb2-5a71ceae796f',
                categoryId: 'a522eab3-b485-4bc0-9a8c-0b9490e72890',
                total: 1000,
                data: new Date('12-12-2023'),
                createdAt: new Date('12-12-2023'),
                updatedAt: new Date('12-12-2023')
            },
            {
                id: 'fd175d4a-2f63-4dd9-bd3e-a003f4485c14',
                userId: 'dfd5d673-a960-4a76-9fb2-5a71ceae796f',
                categoryId: 'aa4f1e80-a0d4-458e-9079-954954947362',
                total: 800,
                data: new Date('12-12-2023'),
                createdAt: new Date('12-12-2023'),
                updatedAt: new Date('12-12-2023')
            },

        ]
    }

    async getTotalGroupedByDate(userId: string, startDate: Date, endDate: Date): Promise<IGetTotalGroupedByDate[]> {
        const expensesGroupedByData: any = groupBy(this._expenses.filter(e => e.userId == userId), 'data')
        const filteredKeys = filterKeysByDate(expensesGroupedByData, startDate, endDate)

        const result = inMemory_formatSumData(filteredKeys, expensesGroupedByData)
        return inMemory_formatYearlyData(result)
    }

    async getByMonthIndividually(userId: string, month: number, year: number): Promise<IGetByMonthIndividually[]> {
        const expenses = this._expenses.filter(e => e.userId == userId && e.data < new Date(`${year}-${month}-28`) && e.data >= new Date(`${year}-${month}-01`)).sort((expA, expB) => expA.total - expB.total)

        const expensesWithCategoryName = await inMemory_replaceCategoryIdByCategoryName(expenses)

        const result = expensesWithCategoryName.map(e => { return { id: e.id || '', category: { nome: e.category as string }, total: e.total } })
        return inMemory_formatMonthlyIndividuallyData(result)
    }

    async getByMonthGroupedByCategory(userId: string, month: number, year: number): Promise<IGetByMonthGroupedByCategory[]> {
        const expensesGroupedByData: any = groupBy(this._expenses.filter(e => e.userId == userId), 'data')
        const filteredKeys = filterKeysByDate(expensesGroupedByData, new Date(`${year}/${month}/01`), new Date(`${year}/${month}/28`))

        const filteredData: IExpense[] = []
        filteredKeys.forEach(key => expensesGroupedByData[key].forEach((item: IExpense) => filteredData.push(item)))

        const groupedByCategory = groupBy(filteredData, 'categoryId')
        const categoryKeys = Object.keys(groupedByCategory)
        const result = inMemory_formatSumCategoryId(categoryKeys, groupedByCategory)
        return result

    }
    async add(expense: IExpense): Promise<IExpense> {
        this._expenses.push(expense)
        return expense
    }
    async update(expenseId: string, expense: IExpense): Promise<IExpense> {
        const expenseIndex = this._expenses.findIndex(expense => expense.id == expenseId)
        this._expenses[expenseIndex] = { id: expenseId, ...expense }
        return expense
    }
    async delete(expenseId: string): Promise<string> {
        this._expenses = this._expenses.filter(expense => expense.id !== expenseId)
        return expenseId
    }
}