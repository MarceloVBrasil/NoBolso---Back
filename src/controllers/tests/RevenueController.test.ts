import { variaveisAmbiente } from "../../utils/EnvironmentVariables";
import server from "../../server";
import { RevenueController } from "../RevenueController";
import { createAxiosInstance } from "./helpers/axiosInstance";
import { getTokens } from "./helpers/getTokens";

const userId = 'dfd5d673-a960-4a76-9fb2-5a71ceae796f'
const revenueId = "c0a3d071-4d80-4e8f-8b61-79a3ef921524"
const categoryId = "64054d22-d594-429c-982b-542d4342b14b"
const revenueController = new RevenueController()

const { TEST_PORT_REVENUE_CONTROLLER } = variaveisAmbiente
const axiosInstance = createAxiosInstance(TEST_PORT_REVENUE_CONTROLLER as string)

const serverInstance = server.listen(TEST_PORT_REVENUE_CONTROLLER)

beforeAll((done) => {
    serverInstance.on("listening", () => done())
})

afterAll((done) => {
    serverInstance.close(() => done())
})

describe("Revenue Controller", () => {
    test("classe Revenue Controller deve estar definida", () => {
        expect(RevenueController).toBeDefined()
    })

    describe("get total grouped by date", () => {
        test("O método getTotalGroupedByDate deve estar definido", () => {
            expect(revenueController.getTotalGroupedByDate).toBeDefined()
        })

        test("O método getTotalGroupedByDate retornar status 200 em caso de sucesso", async () => {
            const { token, refreshToken } = await getTokens(TEST_PORT_REVENUE_CONTROLLER as string)

            const response = await axiosInstance.get('/revenue/total', {
                headers: { authorization: `Bearer ${token}`, refresh_token: `Bearer ${refreshToken}` },
                params: { startDate: new Date('1/1/2023'), endDate: new Date('1/1/2024') }
            })

            expect(response.status).toBe(200)
        })

        describe("validação schema get total grouped by date", () => {
            test("startDate - O método getTotalGroupedByDate deve retornar status 400 e mensagem, caso startDate não for date", async () => {
                const { token, refreshToken } = await getTokens(TEST_PORT_REVENUE_CONTROLLER as string)

                const response = await axiosInstance.get('/revenue/total?startDate=i&endDate=1/1/2024', {
                    headers: { authorization: `Bearer ${token}`, refresh_token: `Bearer ${refreshToken}` },
                })

                expect(response.data.erro).toBe('startDate deve ser um Date')
                expect(response.status).toBe(400)
            })

            test("endDate - O método getTotalGroupedByDate deve retornar status 400 e mensagem, caso endDate não for date", async () => {
                const { token, refreshToken } = await getTokens(TEST_PORT_REVENUE_CONTROLLER as string)

                const response = await axiosInstance.get('/revenue/total?endDate=i&startDate=1/1/2024', {
                    headers: { authorization: `Bearer ${token}`, refresh_token: `Bearer ${refreshToken}` },
                })

                expect(response.data.erro).toBe('endDate deve ser um Date')
                expect(response.status).toBe(400)
            })
        })
    })

    describe("get by month individually", () => {
        test("O método getByMonthIndividually deve estar definido", () => {
            expect(revenueController.getByMonthIndividually).toBeDefined()
        })

        test("O método getByMonthIndividually deve retornar status 200 em caso de sucesso", async () => {
            const { token, refreshToken } = await getTokens(TEST_PORT_REVENUE_CONTROLLER as string)

            const response = await axiosInstance.get('/revenue/month/individually?month=10&year=2023', {
                headers: { authorization: `Bearer ${token}`, refresh_token: `Bearer ${refreshToken}` },
            })

            expect(response.status).toBe(200)
        })

        describe("validação schema getByMonthIndividually", () => {
            test("month - O método getByMonthIndividually deve retornar status 400 e mensagem caso month esteja inválido", async () => {
                const { token, refreshToken } = await getTokens(TEST_PORT_REVENUE_CONTROLLER as string)

                const response = await axiosInstance.get('/revenue/month/individually?month=23&year=2023', {
                    headers: { authorization: `Bearer ${token}`, refresh_token: `Bearer ${refreshToken}` },
                })

                expect(response.data.erro).toBe('month deve ser um número entre 1 e 12')
                expect(response.status).toBe(400)
            })

            test("year - O método getByMonthIndividually deve retornar status 400 e mensagem caso year esteja inválido", async () => {
                const { token, refreshToken } = await getTokens(TEST_PORT_REVENUE_CONTROLLER as string)

                const response = await axiosInstance.get('/revenue/month/individually?month=10&year=2022', {
                    headers: { authorization: `Bearer ${token}`, refresh_token: `Bearer ${refreshToken}` },
                })

                expect(response.data.erro).toBe('year não pode ser menor que 2023')
                expect(response.status).toBe(400)
            })

            test("year - O método getByMonthIndividually deve retornar status 400 e mensagem caso year esteja inválido", async () => {
                const { token, refreshToken } = await getTokens(TEST_PORT_REVENUE_CONTROLLER as string)

                const response = await axiosInstance.get('/revenue/month/individually?month=10&year=3000', {
                    headers: { authorization: `Bearer ${token}`, refresh_token: `Bearer ${refreshToken}` },
                })

                expect(response.data.erro).toBe('year não pode ser maior que o ano atual')
                expect(response.status).toBe(400)
            })
        })
    })

    describe("get by month grouped by category", () => {
        test("O método getByMonthGroupedByCategory deve estar definido", () => {
            expect(revenueController.getByMonthGroupedByCategory).toBeDefined()
        })

        test("O método getByMonthGroupedByCategory deve retornar status 200 em caso de sucesso", async () => {
            const { token, refreshToken } = await getTokens(TEST_PORT_REVENUE_CONTROLLER as string)

            const response = await axiosInstance.get('/revenue/month/grouped?month=10&year=2023', {
                headers: { authorization: `Bearer ${token}`, refresh_token: `Bearer ${refreshToken}` },
            })

            expect(response.status).toBe(200)
        })

        describe("validação schema getByMonthGroupedByCategory", () => {
            test("month - O método getByMonthGroupedByCategory deve retornar status 400 e mensagem caso month esteja inválido", async () => {
                const { token, refreshToken } = await getTokens(TEST_PORT_REVENUE_CONTROLLER as string)

                const response = await axiosInstance.get('/revenue/month/grouped?month=23&year=2023', {
                    headers: { authorization: `Bearer ${token}`, refresh_token: `Bearer ${refreshToken}` },
                })

                expect(response.data.erro).toBe('month deve ser um número entre 1 e 12')
                expect(response.status).toBe(400)
            })

            test("year - O método getByMonthGroupedByCategory deve retornar status 400 e mensagem caso year esteja inválido", async () => {
                const { token, refreshToken } = await getTokens(TEST_PORT_REVENUE_CONTROLLER as string)

                const response = await axiosInstance.get('/revenue/month/grouped?month=10&year=2022', {
                    headers: { authorization: `Bearer ${token}`, refresh_token: `Bearer ${refreshToken}` },
                })

                expect(response.data.erro).toBe('year não pode ser menor que 2023')
                expect(response.status).toBe(400)
            })

            test("year - O método getByMonthGroupedByCategory deve retornar status 400 e mensagem caso year esteja inválido", async () => {
                const { token, refreshToken } = await getTokens(TEST_PORT_REVENUE_CONTROLLER as string)

                const response = await axiosInstance.get('/revenue/month/grouped?month=10&year=3000', {
                    headers: { authorization: `Bearer ${token}`, refresh_token: `Bearer ${refreshToken}` },
                })

                expect(response.data.erro).toBe('year não pode ser maior que o ano atual')
                expect(response.status).toBe(400)
            })
        })
    })

    describe("add", () => {
        const novo_revenue = {
            userId: userId,
            categoryId: categoryId,
            total: 100,
            month: 1,
            year: 2024
        }

        const backup_novo_revenue = {
            userId: userId,
            categoryId: categoryId,
            total: 100,
            month: 1,
            year: 2024
        }

        test("O método add deve estar definido", () => {
            expect(revenueController.add).toBeDefined()
        })

        test("O método add deve retornar status 201 em caso de sucesso", async () => {
            const { token, refreshToken } = await getTokens(TEST_PORT_REVENUE_CONTROLLER as string)

            const response = await axiosInstance.post('/revenue', novo_revenue, {
                headers: { authorization: `Bearer ${token}`, refresh_token: `Bearer ${refreshToken}` },
            })

            expect(response.status).toBe(201)
        })

        test("O método add deve retornar status 400 em caso de categoryId for inválida", async () => {
            const { token, refreshToken } = await getTokens(TEST_PORT_REVENUE_CONTROLLER as string)
            novo_revenue.categoryId = "invalid category id"

            const response = await axiosInstance.post('/revenue', novo_revenue, {
                headers: { authorization: `Bearer ${token}`, refresh_token: `Bearer ${refreshToken}` },
            })

            expect(response.status).toBe(400)
            novo_revenue.categoryId = categoryId
        })

        describe("validação schema add", () => {
            test("month - O método add deve retornar status 400 e mensagem caso month for inválido", async () => {
                const { token, refreshToken } = await getTokens(TEST_PORT_REVENUE_CONTROLLER as string)
                novo_revenue.month = 300

                const response = await axiosInstance.post('/revenue', novo_revenue, {
                    headers: { authorization: `Bearer ${token}`, refresh_token: `Bearer ${refreshToken}` },
                })

                expect(response.data.erro).toBe('month deve ser um número entre 1 e 12')
                expect(response.status).toBe(400)

                novo_revenue.month = backup_novo_revenue.month
            })

            test("year - O método add deve retornar status 400 e mensagem caso year for inválido", async () => {
                const { token, refreshToken } = await getTokens(TEST_PORT_REVENUE_CONTROLLER as string)
                novo_revenue.year = 300

                const response = await axiosInstance.post('/revenue', novo_revenue, {
                    headers: { authorization: `Bearer ${token}`, refresh_token: `Bearer ${refreshToken}` },
                })

                expect(response.data.erro).toBe('year não pode ser menor que 2023')
                expect(response.status).toBe(400)

                novo_revenue.year = novo_revenue.year
            })

            test("year - O método add deve retornar status 400 e mensagem caso year for inválido", async () => {
                const { token, refreshToken } = await getTokens(TEST_PORT_REVENUE_CONTROLLER as string)
                novo_revenue.year = 3000

                const response = await axiosInstance.post('/revenue', novo_revenue, {
                    headers: { authorization: `Bearer ${token}`, refresh_token: `Bearer ${refreshToken}` },
                })

                expect(response.data.erro).toBe('year não pode ser maior que o ano atual')
                expect(response.status).toBe(400)

                novo_revenue.year = backup_novo_revenue.year
            })

            test("categoryId - O método add deve retornar status 400 e mensagem caso categoryId for inválido", async () => {
                const { token, refreshToken } = await getTokens(TEST_PORT_REVENUE_CONTROLLER as string)
                novo_revenue.categoryId = "invalid category id"

                const response = await axiosInstance.post('/revenue', novo_revenue, {
                    headers: { authorization: `Bearer ${token}`, refresh_token: `Bearer ${refreshToken}` },
                })

                expect(response.data.erro).toBe('categoryId deve ser uuid')
                expect(response.status).toBe(400)

                novo_revenue.categoryId = novo_revenue.categoryId
            })

            test("total - O método add deve retornar status 400 e mensagem caso total for inválido", async () => {
                const { token, refreshToken } = await getTokens(TEST_PORT_REVENUE_CONTROLLER as string)
                novo_revenue.total = "invalid category id" as unknown as number

                const response = await axiosInstance.post('/revenue', novo_revenue, {
                    headers: { authorization: `Bearer ${token}`, refresh_token: `Bearer ${refreshToken}` },
                })

                expect(response.data.erro).toBe('total deve ser number')
                expect(response.status).toBe(400)

                novo_revenue.total = novo_revenue.total
            })

            test("total - O método add deve retornar status 400 e mensagem caso total for inválido", async () => {
                const { token, refreshToken } = await getTokens(TEST_PORT_REVENUE_CONTROLLER as string)
                novo_revenue.total = -1

                const response = await axiosInstance.post('/revenue', novo_revenue, {
                    headers: { authorization: `Bearer ${token}`, refresh_token: `Bearer ${refreshToken}` },
                })

                expect(response.data.erro).toBe('total tem que ser maior que zero')
                expect(response.status).toBe(400)

                novo_revenue.total = novo_revenue.total
            })
        })
    })

    describe("update", () => {
        const revenue = {
            id: revenueId,
            userId: userId,
            categoryId: categoryId,
            total: 100,
            month: 1,
            year: 2024
        }

        const backup_revenue = {
            id: revenueId,
            userId: userId,
            categoryId: categoryId,
            total: 100,
            month: 1,
            year: 2024
        }

        test("O método update deve estar definido", async () => {
            expect(revenueController.update).toBeDefined()
        })

        test("O método update deve retornar status 200 em caso de sucesso", async () => {
            const { token, refreshToken } = await getTokens(TEST_PORT_REVENUE_CONTROLLER as string)

            const response = await axiosInstance.put(`/revenue/${revenue.id}`, revenue, {
                headers: { authorization: `Bearer ${token}`, refresh_token: `Bearer ${refreshToken}` },
            })

            expect(response.status).toBe(200)
        })

        test("O método update deve retornar status 400 e mensagem em caso de categoryId inválida", async () => {
            const { token, refreshToken } = await getTokens(TEST_PORT_REVENUE_CONTROLLER as string)
            revenue.categoryId = "8a57e059-e6b0-4ca3-adf5-b5eacf481d1b"

            const response = await axiosInstance.put(`/revenue/${revenue.id}`, revenue, {
                headers: { authorization: `Bearer ${token}`, refresh_token: `Bearer ${refreshToken}` },
            })

            expect(response.data.erro).toBe('Categoria inválida')
            expect(response.status).toBe(400)
            revenue.categoryId = backup_revenue.categoryId
        })

        describe("validação schema update", () => {
            test("id - O método update retorna status 400 e mensagem caso id for inválida", async () => {
                const { token, refreshToken } = await getTokens(TEST_PORT_REVENUE_CONTROLLER as string)
                revenue.id = "invalid id"

                const response = await axiosInstance.put(`/revenue/${revenue.id}`, revenue, {
                    headers: { authorization: `Bearer ${token}`, refresh_token: `Bearer ${refreshToken}` },
                })

                expect(response.data.erro).toBe('id deve ser uuid')
                expect(response.status).toBe(400)

                revenue.id = backup_revenue.id
            })

            test("month - O método update deve retornar status 400 e mensagem caso month for inválido", async () => {
                const { token, refreshToken } = await getTokens(TEST_PORT_REVENUE_CONTROLLER as string)
                revenue.month = 300

                const response = await axiosInstance.put(`/revenue/${revenue.id}`, revenue, {
                    headers: { authorization: `Bearer ${token}`, refresh_token: `Bearer ${refreshToken}` },
                })

                expect(response.data.erro).toBe('month deve ser um número entre 1 e 12')
                expect(response.status).toBe(400)

                revenue.month = backup_revenue.month
            })

            test("year - O método update deve retornar status 400 e mensagem caso year for inválido", async () => {
                const { token, refreshToken } = await getTokens(TEST_PORT_REVENUE_CONTROLLER as string)
                revenue.year = 300

                const response = await axiosInstance.put(`/revenue/${revenue.id}`, revenue, {
                    headers: { authorization: `Bearer ${token}`, refresh_token: `Bearer ${refreshToken}` },
                })

                expect(response.data.erro).toBe('year não pode ser menor que 2023')
                expect(response.status).toBe(400)

                revenue.year = backup_revenue.year
            })

            test("year - O método update deve retornar status 400 e mensagem caso year for inválido", async () => {
                const { token, refreshToken } = await getTokens(TEST_PORT_REVENUE_CONTROLLER as string)
                revenue.year = 3000

                const response = await axiosInstance.put(`/revenue/${revenue.id}`, revenue, {
                    headers: { authorization: `Bearer ${token}`, refresh_token: `Bearer ${refreshToken}` },
                })

                expect(response.data.erro).toBe('year não pode ser maior que o ano atual')
                expect(response.status).toBe(400)

                revenue.year = backup_revenue.year
            })

            test("categoryId - O método update deve retornar status 400 e mensagem caso categoryId for inválido", async () => {
                const { token, refreshToken } = await getTokens(TEST_PORT_REVENUE_CONTROLLER as string)
                revenue.categoryId = "invalid category id"

                const response = await axiosInstance.put(`/revenue/${revenue.id}`, revenue, {
                    headers: { authorization: `Bearer ${token}`, refresh_token: `Bearer ${refreshToken}` },
                })

                expect(response.data.erro).toBe('categoryId deve ser uuid')
                expect(response.status).toBe(400)

                revenue.categoryId = backup_revenue.categoryId
            })

            test("total - O método update deve retornar status 400 e mensagem caso total for inválido", async () => {
                const { token, refreshToken } = await getTokens(TEST_PORT_REVENUE_CONTROLLER as string)
                revenue.total = "invalid category id" as unknown as number

                const response = await axiosInstance.put(`/revenue/${revenue.id}`, revenue, {
                    headers: { authorization: `Bearer ${token}`, refresh_token: `Bearer ${refreshToken}` },
                })

                expect(response.data.erro).toBe('total deve ser number')
                expect(response.status).toBe(400)

                revenue.total = backup_revenue.total
            })

            test("total - O método update deve retornar status 400 e mensagem caso total for inválido", async () => {
                const { token, refreshToken } = await getTokens(TEST_PORT_REVENUE_CONTROLLER as string)
                revenue.total = -1

                const response = await axiosInstance.put(`/revenue/${revenue.id}`, revenue, {
                    headers: { authorization: `Bearer ${token}`, refresh_token: `Bearer ${refreshToken}` },
                })

                expect(response.data.erro).toBe('total tem que ser maior que zero')
                expect(response.status).toBe(400)

                revenue.total = backup_revenue.total
            })
        })
    })

    describe("delete", () => {
        test("O método delete deve estar definido", () => {
            expect(revenueController.delete).toBeDefined()
        })

        test("O método delete deve retornar status 200 em caso de sucesso", async () => {
            const { token, refreshToken } = await getTokens(TEST_PORT_REVENUE_CONTROLLER as string)

            const response = await axiosInstance.delete(`/revenue/${revenueId}`, {
                headers: { authorization: `Bearer ${token}`, refresh_token: `Bearer ${refreshToken}` }
            })

            expect(response.status).toBe(200)
        })

        describe("validação schema delete", () => {
            test("id - O método delete deve retornar status 400 e mensagem caso o id esteja inválido", async () => {
                const revenueId = 'invalid id'

                const { token, refreshToken } = await getTokens(TEST_PORT_REVENUE_CONTROLLER as string)
                const response = await axiosInstance.delete(`/revenue/${revenueId}`, {
                    headers: { authorization: `Bearer ${token}`, refresh_token: `Bearer ${refreshToken}` }
                })

                expect(response.data.erro).toBe('id deve ser uuid')
                expect(response.status).toBe(400)
            })
        })
    })
})