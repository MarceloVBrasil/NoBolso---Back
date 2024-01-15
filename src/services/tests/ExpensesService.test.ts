import { InMemoryExpensesRepository } from "../../repository/inMemory/InMemoryExpensesRepository";
import { ExpensesService } from "../ExpensesService";
import { IExpense } from "../../models/Expenses"

const expenseService = new ExpensesService(new InMemoryExpensesRepository())
const userId = 'dfd5d673-a960-4a76-9fb2-5a71ceae796f'
const MESES = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
]

describe("Expenses Service", () => {
    test("A classe ExpensesService deve estar definida", () => {
        expect(ExpensesService).toBeDefined()
    })

    describe("get total grouped by date", () => {
        const meses = MESES
        const startDate = new Date('1/1/2023')
        const endDate = new Date('1/1/2024')

        test("O método getTotalGroupedByDate deve estar definido", async () => {
            expect(expenseService.getTotalGroupedByDate).toBeDefined()
        })

        test("O método getTotalGroupedByDate deve retornar um array com total de despesas de cada mês de um determinado intervalo", async () => {
            const expenses = await expenseService.getTotalGroupedByDate(userId, startDate, endDate)
            const mesesExpenses = expenses.map(e => e.mes)

            const seTemExpenseParaCadaMesDoAno = meses.every(mes => mesesExpenses.includes(mes))
            expect(seTemExpenseParaCadaMesDoAno).toBeTruthy()
        })

        test("O método getTotalGroupedByDate deve retornar erro caso endDate for anterior a startDate", async () => {
            expect(expenseService.getTotalGroupedByDate(userId, endDate, startDate)).rejects.toThrow(new Error('endDate deve ser posterior a startDate'))
        })
    })

    describe("get by month grouped by category", () => {
        const mes_janeiro = 1
        const ano_2023 = 2023

        test("O método getByMonthGroupedByCategory deve estar definido", async () => {
            expect(expenseService.getByMonthGroupedByCategory).toBeDefined()
        })

        test("O método getByMonthGroupedByCategory deve retornar array com os gastos agrupados por categoria de um determinado intervalo de tempo", async () => {
            const expensesGroupedByCategory = await expenseService.getByMonthGroupedByCategory(userId, mes_janeiro, ano_2023)
            expect(expensesGroupedByCategory[0]).toHaveProperty('categoria')
        })
    })

    describe("get by month individually", () => {
        const mes_janeiro = 1
        const ano_2023 = 2023

        test("O método getByMonthIndividually deve estar definido", async () => {
            expect(expenseService.getByMonthIndividually).toBeDefined()
        })

        test("O método getByMonthIndividually deve retornar array com os gastos de um mês específico", async () => {
            const expensesGroupedByCategory = await expenseService.getByMonthIndividually(userId, mes_janeiro, ano_2023)
            expect(expensesGroupedByCategory[0]).toHaveProperty('categoria')
        })
    })

    describe("add", () => {
        const categoryId = "a522eab3-b485-4bc0-9a8c-0b9490e72890"

        test("O método add deve estar definido", async () => {
            expect(expenseService.add).toBeDefined()
        })

        test("O método add deve adicionar um gasto", async () => {
            const gasto: IExpense = {
                total: 300,
                categoryId: categoryId,
                userId: userId,
                data: new Date('01/01/2024'),
            }

            const expense = await expenseService.add(gasto)

            expect(expense).toHaveProperty('id')
            await expenseService.delete(expense.id as string)
        })

        test("O método add deve dar erro caso a categoria não exista", async () => {
            const gasto: IExpense = {
                total: 300,
                categoryId: '',
                userId: userId,
                data: new Date('01/01/2024'),
            }

            expect(expenseService.add(gasto)).rejects.toThrow(new Error('Categoria inválida'))
        })
    })

    describe("update", () => {
        const categoryId = "a522eab3-b485-4bc0-9a8c-0b9490e72890"

        test("O método update deve estar definido", async () => {
            expect(expenseService.update).toBeDefined()
        })

        test("O método update deve atualizar um gasto", async () => {
            const gasto: IExpense = {
                total: 300,
                categoryId: categoryId,
                userId: userId,
                data: new Date('01/01/2024'),
            }

            const expense = await expenseService.add(gasto)
            expense.total = 500

            const updatedExpense = await expenseService.update(expense.id as string, expense)

            expect(updatedExpense.total).toBe(500)
            await expenseService.delete(expense.id as string)
        })

        test("O método update deve dar erro caso a categoria não exista", async () => {
            const gasto: IExpense = {
                total: 300,
                categoryId: categoryId,
                userId: userId,
                data: new Date('01/01/2024'),
            }

            const expense = await expenseService.add(gasto)
            expense.categoryId = ''

            expect(expenseService.update(expense.id as string, expense)).rejects.toThrow(new Error('Categoria inválida'))
            await expenseService.delete(expense.id as string)
        })
    })

    describe("delete", () => {
        const categoryId = "a522eab3-b485-4bc0-9a8c-0b9490e72890"
        test("O método delete deve estar definido", () => {
            expect(expenseService.delete).toBeDefined()
        })

        test("O método delete deve remover um gasto", async () => {
            const gasto: IExpense = {
                total: 300,
                categoryId: categoryId,
                userId: userId,
                data: new Date('01/01/2024'),
                updatedAt: new Date('01/01/2024')
            }

            const expense = await expenseService.add(gasto)
            await expenseService.delete(expense.id as string)
            expect(expenseService.add(gasto)).resolves.toHaveProperty('id')
        })
    })
})