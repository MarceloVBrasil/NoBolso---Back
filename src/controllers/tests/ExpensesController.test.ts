import { variaveisAmbiente } from "../../utils/EnvironmentVariables";
import server from "../../server";
import { ExpensesController } from "../ExpensesController";
import { createAxiosInstance } from "./helpers/axiosInstance";
import { getTokens } from "./helpers/getTokens";

const userId = 'dfd5d673-a960-4a76-9fb2-5a71ceae796f'
const expenseId = "c0a3d071-4d80-4e8f-8b61-79a3ef921524"
const categoryId = "a522eab3-b485-4bc0-9a8c-0b9490e72890"

const expenseController = new ExpensesController()

const { TEST_PORT_EXPENSES_CONTROLLER } = variaveisAmbiente
const axiosInstance = createAxiosInstance(TEST_PORT_EXPENSES_CONTROLLER as string)

const serverInstance = server.listen(TEST_PORT_EXPENSES_CONTROLLER)

beforeAll((done) => {
    serverInstance.on("listening", () => done())
})

afterAll((done) => {
    serverInstance.close(() => done())
})
describe("Expenses Controller", () => {
    test("classe Expenses Controller deve estar definida", () => {
        expect(ExpensesController).toBeDefined()
    })

    describe("get total grouped by date", () => {
        test("O método getTotalGroupedByDate deve estar definido", () => {
            expect(expenseController.getTotalGroupedByDate).toBeDefined()
        })

        test("O método getTotalGroupedByDate retornar status 200 em caso de sucesso", async () => {
            const { token, refreshToken } = await getTokens(TEST_PORT_EXPENSES_CONTROLLER as string)

            const response = await axiosInstance.get('/expenses/total', {
                headers: { authorization: `Bearer ${token}`, refresh_token: `Bearer ${refreshToken}` },
                params: { startDate: new Date('1/1/2023'), endDate: new Date('1/1/2024') }
            })

            expect(response.status).toBe(200)
        })

        describe("validação schema get total grouped by date", () => {
            test("startDate - O método getTotalGroupedByDate deve retornar status 400 e mensagem, caso startDate não for date", async () => {
                const { token, refreshToken } = await getTokens(TEST_PORT_EXPENSES_CONTROLLER as string)

                const response = await axiosInstance.get('/expenses/total?startDate=i&endDate=1/1/2024', {
                    headers: { authorization: `Bearer ${token}`, refresh_token: `Bearer ${refreshToken}` },
                })

                expect(response.data.erro).toBe('startDate deve ser um Date')
                expect(response.status).toBe(400)
            })

            test("endDate - O método getTotalGroupedByDate deve retornar status 400 e mensagem, caso endDate não for date", async () => {
                const { token, refreshToken } = await getTokens(TEST_PORT_EXPENSES_CONTROLLER as string)

                const response = await axiosInstance.get('/expenses/total?endDate=i&startDate=1/1/2024', {
                    headers: { authorization: `Bearer ${token}`, refresh_token: `Bearer ${refreshToken}` },
                })

                expect(response.data.erro).toBe('endDate deve ser um Date')
                expect(response.status).toBe(400)
            })
        })
    })

    describe("get by month individually", () => {
        test("O método getByMonthIndividually deve estar definido", () => {
            expect(expenseController.getByMonthIndividually).toBeDefined()
        })

        test("O método getByMonthIndividually deve retornar status 200 em caso de sucesso", async () => {
            const { token, refreshToken } = await getTokens(TEST_PORT_EXPENSES_CONTROLLER as string)

            const response = await axiosInstance.get('/expenses/month/individually?month=10&year=2023', {
                headers: { authorization: `Bearer ${token}`, refresh_token: `Bearer ${refreshToken}` },
            })

            expect(response.status).toBe(200)
        })

        describe("validação schema getByMonthIndividually", () => {
            test("month - O método getByMonthIndividually deve retornar status 400 e mensagem caso month esteja inválido", async () => {
                const { token, refreshToken } = await getTokens(TEST_PORT_EXPENSES_CONTROLLER as string)

                const response = await axiosInstance.get('/expenses/month/individually?month=23&year=2023', {
                    headers: { authorization: `Bearer ${token}`, refresh_token: `Bearer ${refreshToken}` },
                })

                expect(response.data.erro).toBe('month deve ser um número entre 1 e 12')
                expect(response.status).toBe(400)
            })

            test("year - O método getByMonthIndividually deve retornar status 400 e mensagem caso year esteja inválido", async () => {
                const { token, refreshToken } = await getTokens(TEST_PORT_EXPENSES_CONTROLLER as string)

                const response = await axiosInstance.get('/expenses/month/individually?month=10&year=2022', {
                    headers: { authorization: `Bearer ${token}`, refresh_token: `Bearer ${refreshToken}` },
                })

                expect(response.data.erro).toBe('year não pode ser menor que 2023')
                expect(response.status).toBe(400)
            })

            test("year - O método getByMonthIndividually deve retornar status 400 e mensagem caso year esteja inválido", async () => {
                const { token, refreshToken } = await getTokens(TEST_PORT_EXPENSES_CONTROLLER as string)

                const response = await axiosInstance.get('/expenses/month/individually?month=10&year=3000', {
                    headers: { authorization: `Bearer ${token}`, refresh_token: `Bearer ${refreshToken}` },
                })

                expect(response.data.erro).toBe('year não pode ser maior que o ano atual')
                expect(response.status).toBe(400)
            })
        })
    })

    describe("get by month grouped by category", () => {
        test("O método getByMonthGroupedByCategory deve estar definido", () => {
            expect(expenseController.getByMonthGroupedByCategory).toBeDefined()
        })

        test("O método getByMonthGroupedByCategory deve retornar status 200 em caso de sucesso", async () => {
            const { token, refreshToken } = await getTokens(TEST_PORT_EXPENSES_CONTROLLER as string)

            const response = await axiosInstance.get('/expenses/month/grouped?month=10&year=2023', {
                headers: { authorization: `Bearer ${token}`, refresh_token: `Bearer ${refreshToken}` },
            })

            expect(response.status).toBe(200)
        })

        describe("validação schema getByMonthGroupedByCategory", () => {
            test("month - O método getByMonthGroupedByCategory deve retornar status 400 e mensagem caso month esteja inválido", async () => {
                const { token, refreshToken } = await getTokens(TEST_PORT_EXPENSES_CONTROLLER as string)

                const response = await axiosInstance.get('/expenses/month/grouped?month=23&year=2023', {
                    headers: { authorization: `Bearer ${token}`, refresh_token: `Bearer ${refreshToken}` },
                })

                expect(response.data.erro).toBe('month deve ser um número entre 1 e 12')
                expect(response.status).toBe(400)
            })

            test("year - O método getByMonthGroupedByCategory deve retornar status 400 e mensagem caso year esteja inválido", async () => {
                const { token, refreshToken } = await getTokens(TEST_PORT_EXPENSES_CONTROLLER as string)

                const response = await axiosInstance.get('/expenses/month/grouped?month=10&year=2022', {
                    headers: { authorization: `Bearer ${token}`, refresh_token: `Bearer ${refreshToken}` },
                })

                expect(response.data.erro).toBe('year não pode ser menor que 2023')
                expect(response.status).toBe(400)
            })

            test("year - O método getByMonthGroupedByCategory deve retornar status 400 e mensagem caso year esteja inválido", async () => {
                const { token, refreshToken } = await getTokens(TEST_PORT_EXPENSES_CONTROLLER as string)

                const response = await axiosInstance.get('/expenses/month/grouped?month=10&year=3000', {
                    headers: { authorization: `Bearer ${token}`, refresh_token: `Bearer ${refreshToken}` },
                })

                expect(response.data.erro).toBe('year não pode ser maior que o ano atual')
                expect(response.status).toBe(400)
            })
        })
    })

    describe("add", () => {
        const novo_expense = {
            userId: userId,
            categoryId: categoryId,
            total: 100,
            month: 1,
            year: 2024
        }

        const backup_novo_expense = {
            userId: userId,
            categoryId: categoryId,
            total: 100,
            month: 1,
            year: 2024
        }

        test("O método add deve estar definido", () => {
            expect(expenseController.add).toBeDefined()
        })

        test("O método add deve retornar status 201 em caso de sucesso", async () => {
            const { token, refreshToken } = await getTokens(TEST_PORT_EXPENSES_CONTROLLER as string)

            const response = await axiosInstance.post('/expenses', novo_expense, {
                headers: { authorization: `Bearer ${token}`, refresh_token: `Bearer ${refreshToken}` },
            })

            expect(response.status).toBe(201)
        })

        test("O método add deve retornar status 400 em caso de categoryId for inválida", async () => {
            const { token, refreshToken } = await getTokens(TEST_PORT_EXPENSES_CONTROLLER as string)
            novo_expense.categoryId = "invalid category id"

            const response = await axiosInstance.post('/expenses', novo_expense, {
                headers: { authorization: `Bearer ${token}`, refresh_token: `Bearer ${refreshToken}` },
            })

            expect(response.status).toBe(400)
            novo_expense.categoryId = categoryId
        })

        describe("validação schema add", () => {
            test("month - O método add deve retornar status 400 e mensagem caso month for inválido", async () => {
                const { token, refreshToken } = await getTokens(TEST_PORT_EXPENSES_CONTROLLER as string)
                novo_expense.month = 300

                const response = await axiosInstance.post('/expenses', novo_expense, {
                    headers: { authorization: `Bearer ${token}`, refresh_token: `Bearer ${refreshToken}` },
                })

                expect(response.data.erro).toBe('month deve ser um número entre 1 e 12')
                expect(response.status).toBe(400)

                novo_expense.month = backup_novo_expense.month
            })

            test("year - O método add deve retornar status 400 e mensagem caso year for inválido", async () => {
                const { token, refreshToken } = await getTokens(TEST_PORT_EXPENSES_CONTROLLER as string)
                novo_expense.year = 300

                const response = await axiosInstance.post('/expenses', novo_expense, {
                    headers: { authorization: `Bearer ${token}`, refresh_token: `Bearer ${refreshToken}` },
                })

                expect(response.data.erro).toBe('year não pode ser menor que 2023')
                expect(response.status).toBe(400)

                novo_expense.year = novo_expense.year
            })

            test("year - O método add deve retornar status 400 e mensagem caso year for inválido", async () => {
                const { token, refreshToken } = await getTokens(TEST_PORT_EXPENSES_CONTROLLER as string)
                novo_expense.year = 3000

                const response = await axiosInstance.post('/expenses', novo_expense, {
                    headers: { authorization: `Bearer ${token}`, refresh_token: `Bearer ${refreshToken}` },
                })

                expect(response.data.erro).toBe('year não pode ser maior que o ano atual')
                expect(response.status).toBe(400)

                novo_expense.year = backup_novo_expense.year
            })

            test("categoryId - O método add deve retornar status 400 e mensagem caso categoryId for inválido", async () => {
                const { token, refreshToken } = await getTokens(TEST_PORT_EXPENSES_CONTROLLER as string)
                novo_expense.categoryId = "invalid category id"

                const response = await axiosInstance.post('/expenses', novo_expense, {
                    headers: { authorization: `Bearer ${token}`, refresh_token: `Bearer ${refreshToken}` },
                })

                expect(response.data.erro).toBe('categoryId deve ser uuid')
                expect(response.status).toBe(400)

                novo_expense.categoryId = novo_expense.categoryId
            })

            test("total - O método add deve retornar status 400 e mensagem caso total for inválido", async () => {
                const { token, refreshToken } = await getTokens(TEST_PORT_EXPENSES_CONTROLLER as string)
                novo_expense.total = "invalid category id" as unknown as number

                const response = await axiosInstance.post('/expenses', novo_expense, {
                    headers: { authorization: `Bearer ${token}`, refresh_token: `Bearer ${refreshToken}` },
                })

                expect(response.data.erro).toBe('total deve ser number')
                expect(response.status).toBe(400)

                novo_expense.total = novo_expense.total
            })

            test("total - O método add deve retornar status 400 e mensagem caso total for inválido", async () => {
                const { token, refreshToken } = await getTokens(TEST_PORT_EXPENSES_CONTROLLER as string)
                novo_expense.total = -1

                const response = await axiosInstance.post('/expenses', novo_expense, {
                    headers: { authorization: `Bearer ${token}`, refresh_token: `Bearer ${refreshToken}` },
                })

                expect(response.data.erro).toBe('total tem que ser maior que zero')
                expect(response.status).toBe(400)

                novo_expense.total = novo_expense.total
            })
        })
    })

    describe("update", () => {
        const expense = {
            id: expenseId,
            userId: userId,
            categoryId: categoryId,
            total: 100,
            month: 1,
            year: 2024
        }

        const backup_expense = {
            id: expenseId,
            userId: userId,
            categoryId: categoryId,
            total: 100,
            month: 1,
            year: 2024
        }

        test("O método update deve estar definido", async () => {
            expect(expenseController.update).toBeDefined()
        })

        test("O método update deve retornar status 200 em caso de sucesso", async () => {
            const { token, refreshToken } = await getTokens(TEST_PORT_EXPENSES_CONTROLLER as string)

            const response = await axiosInstance.put(`/expenses/${expense.id}`, expense, {
                headers: { authorization: `Bearer ${token}`, refresh_token: `Bearer ${refreshToken}` },
            })

            expect(response.status).toBe(200)
        })

        test("O método update deve retornar status 400 e mensagem em caso de categoryId inválida", async () => {
            const { token, refreshToken } = await getTokens(TEST_PORT_EXPENSES_CONTROLLER as string)
            expense.categoryId = "8a57e059-e6b0-4ca3-adf5-b5eacf481d1b"

            const response = await axiosInstance.put(`/expenses/${expense.id}`, expense, {
                headers: { authorization: `Bearer ${token}`, refresh_token: `Bearer ${refreshToken}` },
            })

            expect(response.data.erro).toBe('Categoria inválida')
            expect(response.status).toBe(400)
            expense.categoryId = backup_expense.categoryId
        })

        describe("validação schema update", () => {
            test("id - O método update retorna status 400 e mensagem caso id for inválida", async () => {
                const { token, refreshToken } = await getTokens(TEST_PORT_EXPENSES_CONTROLLER as string)
                expense.id = "invalid id"

                const response = await axiosInstance.put(`/expenses/${expense.id}`, expense, {
                    headers: { authorization: `Bearer ${token}`, refresh_token: `Bearer ${refreshToken}` },
                })

                expect(response.data.erro).toBe('id deve ser uuid')
                expect(response.status).toBe(400)

                expense.id = backup_expense.id
            })

            test("month - O método update deve retornar status 400 e mensagem caso month for inválido", async () => {
                const { token, refreshToken } = await getTokens(TEST_PORT_EXPENSES_CONTROLLER as string)
                expense.month = 300

                const response = await axiosInstance.put(`/expenses/${expense.id}`, expense, {
                    headers: { authorization: `Bearer ${token}`, refresh_token: `Bearer ${refreshToken}` },
                })

                expect(response.data.erro).toBe('month deve ser um número entre 1 e 12')
                expect(response.status).toBe(400)

                expense.month = backup_expense.month
            })

            test("year - O método update deve retornar status 400 e mensagem caso year for inválido", async () => {
                const { token, refreshToken } = await getTokens(TEST_PORT_EXPENSES_CONTROLLER as string)
                expense.year = 300

                const response = await axiosInstance.put(`/expenses/${expense.id}`, expense, {
                    headers: { authorization: `Bearer ${token}`, refresh_token: `Bearer ${refreshToken}` },
                })

                expect(response.data.erro).toBe('year não pode ser menor que 2023')
                expect(response.status).toBe(400)

                expense.year = backup_expense.year
            })

            test("year - O método update deve retornar status 400 e mensagem caso year for inválido", async () => {
                const { token, refreshToken } = await getTokens(TEST_PORT_EXPENSES_CONTROLLER as string)
                expense.year = 3000

                const response = await axiosInstance.put(`/expenses/${expense.id}`, expense, {
                    headers: { authorization: `Bearer ${token}`, refresh_token: `Bearer ${refreshToken}` },
                })

                expect(response.data.erro).toBe('year não pode ser maior que o ano atual')
                expect(response.status).toBe(400)

                expense.year = backup_expense.year
            })

            test("categoryId - O método update deve retornar status 400 e mensagem caso categoryId for inválido", async () => {
                const { token, refreshToken } = await getTokens(TEST_PORT_EXPENSES_CONTROLLER as string)
                expense.categoryId = "invalid category id"

                const response = await axiosInstance.put(`/expenses/${expense.id}`, expense, {
                    headers: { authorization: `Bearer ${token}`, refresh_token: `Bearer ${refreshToken}` },
                })

                expect(response.data.erro).toBe('categoryId deve ser uuid')
                expect(response.status).toBe(400)

                expense.categoryId = backup_expense.categoryId
            })

            test("total - O método update deve retornar status 400 e mensagem caso total for inválido", async () => {
                const { token, refreshToken } = await getTokens(TEST_PORT_EXPENSES_CONTROLLER as string)
                expense.total = "invalid category id" as unknown as number

                const response = await axiosInstance.put(`/expenses/${expense.id}`, expense, {
                    headers: { authorization: `Bearer ${token}`, refresh_token: `Bearer ${refreshToken}` },
                })

                expect(response.data.erro).toBe('total deve ser number')
                expect(response.status).toBe(400)

                expense.total = backup_expense.total
            })

            test("total - O método update deve retornar status 400 e mensagem caso total for inválido", async () => {
                const { token, refreshToken } = await getTokens(TEST_PORT_EXPENSES_CONTROLLER as string)
                expense.total = -1

                const response = await axiosInstance.put(`/expenses/${expense.id}`, expense, {
                    headers: { authorization: `Bearer ${token}`, refresh_token: `Bearer ${refreshToken}` },
                })

                expect(response.data.erro).toBe('total tem que ser maior que zero')
                expect(response.status).toBe(400)

                expense.total = backup_expense.total
            })
        })
    })

    describe("delete", () => {
        test("O método delete deve estar definido", () => {
            expect(expenseController.delete).toBeDefined()
        })

        test("O método delete deve retornar status 200 em caso de sucesso", async () => {
            const { token, refreshToken } = await getTokens(TEST_PORT_EXPENSES_CONTROLLER as string)

            const response = await axiosInstance.delete(`/expenses/${expenseId}`, {
                headers: { authorization: `Bearer ${token}`, refresh_token: `Bearer ${refreshToken}` }
            })

            expect(response.status).toBe(200)
        })

        describe("validação schema delete", () => {
            test("id - O método delete deve retornar status 400 e mensagem caso o id esteja inválido", async () => {
                const expenseId = 'invalid id'

                const { token, refreshToken } = await getTokens(TEST_PORT_EXPENSES_CONTROLLER as string)
                const response = await axiosInstance.delete(`/expenses/${expenseId}`, {
                    headers: { authorization: `Bearer ${token}`, refresh_token: `Bearer ${refreshToken}` }
                })

                expect(response.data.erro).toBe('id deve ser uuid')
                expect(response.status).toBe(400)
            })
        })
    })
})