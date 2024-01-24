import { InMemoryRevenueRepository } from "../../repository/inMemory/InMemoryRevenueRepository"
import { RevenueService } from "../RevenueService"
import { IRevenue } from "../../models/Revenue"

const revenueService = new RevenueService(new InMemoryRevenueRepository())
const userId = 'dfd5d673-a960-4a76-9fb2-5a71ceae796f'
const MESES = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
]

describe("Revenue Service", () => {
    test("classe RevenueService deve estar definida", () => {
        expect(RevenueService).toBeDefined()
    })

    describe("get total grouped by date", () => {
        const meses = MESES
        const startDate = new Date('1/1/2023')
        const endDate = new Date('1/1/2024')

        test("O método getTotalGroupedByDate deve estar definido", () => {
            expect(revenueService.getTotalGroupedByDate).toBeDefined()
        })

        test("O método getTotalGroupedByDate deve retornar o a soma total das receitas do mês em um intervalo dado", async () => {
            const revenues = await revenueService.getTotalGroupedByDate(userId, startDate, endDate)
            const mesesRevenues = revenues.map(r => r.mes)

            const seTemRevenueParaCadaMesDoAno = meses.every(mes => mesesRevenues.includes(mes))
            expect(seTemRevenueParaCadaMesDoAno).toBeTruthy()
        })

        test("O método getTotalGroupedByDate deve retornar erro caso endDate for anterior a startDate", async () => {
            expect(revenueService.getTotalGroupedByDate(userId, endDate, startDate)).rejects.toThrow(new Error('endDate deve ser posterior a startDate'))
        })
    })

    describe("get by month grouped by category", () => {
        const mes_janeiro = 1
        const ano_2023 = 2023

        test("O método getByMonthGroupedByCategory deve estar definido", async () => {
            expect(revenueService.getByMonthGroupedByCategory).toBeDefined()
        })

        test("O método getByMonthGroupedByCategory deve retornar array com as receitas agrupados por categoria de um determinado intervalo de tempo", async () => {
            const revenuedGroupedByCategory = await revenueService.getByMonthGroupedByCategory(userId, mes_janeiro, ano_2023)
            expect(revenuedGroupedByCategory[0]).toHaveProperty('categoria')
            expect(revenuedGroupedByCategory[0]).toHaveProperty('meta')
        })
    })

    describe("get by month individually", () => {
        const mes_janeiro = 1
        const ano_2023 = 2023

        test("O método getByMonthIndividually deve estar definido", async () => {
            expect(revenueService.getByMonthIndividually).toBeDefined()
        })

        test("O método getByMonthIndividually deve retornar array com os receitas de um mês específico", async () => {
            const revenuesGroupedByCategory = await revenueService.getByMonthIndividually(userId, mes_janeiro, ano_2023)
            expect(revenuesGroupedByCategory[0]).toHaveProperty('categoria')
        })
    })

    describe("add", () => {
        const categoryId = "f7a425f5-6152-40a5-afb3-e38ce671c330"

        test("O método add deve estar definido", async () => {
            expect(revenueService.add).toBeDefined()
        })

        test("O método add deve adicionar uma receita", async () => {
            const receita: IRevenue = {
                total: 4000,
                categoryId: categoryId,
                userId: userId,
                data: new Date('01/01/2024'),
            }

            const revenue = await revenueService.add(receita)

            expect(revenue).toHaveProperty('id')
            await revenueService.delete(revenue.id as string)
        })

        test("O método add deve dar erro caso a categoria não exista", async () => {
            const receita: IRevenue = {
                total: 300,
                categoryId: '',
                userId: userId,
                data: new Date('01/01/2024'),
            }

            expect(revenueService.add(receita)).rejects.toThrow(new Error('Categoria inválida'))
        })
    })

    describe("update", () => {
        const categoryId = "f7a425f5-6152-40a5-afb3-e38ce671c330"

        test("O método update deve estar definido", async () => {
            expect(revenueService.update).toBeDefined()
        })

        test("O método update deve atualizar uma receita", async () => {
            const gasto: IRevenue = {
                total: 300,
                categoryId: categoryId,
                userId: userId,
                data: new Date('01/01/2024'),
            }

            const revenue = await revenueService.add(gasto)
            revenue.total = 500

            const updatedExpense = await revenueService.update(revenue.id as string, revenue)

            expect(updatedExpense.total).toBe(500)
            await revenueService.delete(revenue.id as string)
        })

        test("O método update deve dar erro caso a categoria não exista", async () => {
            const gasto: IRevenue = {
                total: 300,
                categoryId: categoryId,
                userId: userId,
                data: new Date('01/01/2024'),
            }

            const revenue = await revenueService.add(gasto)
            revenue.categoryId = ''

            expect(revenueService.update(revenue.id as string, revenue)).rejects.toThrow(new Error('Categoria inválida'))
            await revenueService.delete(revenue.id as string)
        })
    })

    describe("delete", () => {
        const categoryId = "f7a425f5-6152-40a5-afb3-e38ce671c330"
        test("O método delete deve estar definido", () => {
            expect(revenueService.delete).toBeDefined()
        })

        test("O método delete deve remover uma receita", async () => {
            const receita: IRevenue = {
                total: 300,
                categoryId: categoryId,
                userId: userId,
                data: new Date('01/01/2024'),
            }

            const expense = await revenueService.add(receita)
            await revenueService.delete(expense.id as string)
            expect(revenueService.add(receita)).resolves.toHaveProperty('id')
        })
    })
})