import { variaveisAmbiente } from "../../utils/EnvironmentVariables";
import server from "../../server";
import { CategoryController } from "../CategoryController";
import { ICategory } from "../../models/Category";
import { createAxiosInstance } from "./helpers/axiosInstance";
import { getTokens } from "./helpers/getTokens";

const userId = 'dfd5d673-a960-4a76-9fb2-5a71ceae796f'
const categoryController = new CategoryController()

const { TEST_PORT_CATEGORY_CONTROLLER } = variaveisAmbiente
const axiosInstance = createAxiosInstance(TEST_PORT_CATEGORY_CONTROLLER as string)

const serverInstance = server.listen(TEST_PORT_CATEGORY_CONTROLLER)

beforeAll((done) => {
    serverInstance.on("listening", () => done())
})

afterAll((done) => {
    serverInstance.close(() => done())
})

describe("Category Controller", () => {
    test("classe CategoryController deve estar definida", () => {
        expect(CategoryController).toBeDefined()
    })

    describe("get all", () => {
        test("O método getAll deve estart definido", () => {
            expect(categoryController.getAll).toBeDefined()
        })

        test("O método getAll deve retornar status 200 em caso de sucesso", async () => {
            const { token, refreshToken } = await getTokens(TEST_PORT_CATEGORY_CONTROLLER as string)

            const response = await axiosInstance.get('/category', {
                headers: { authorization: `Bearer ${token}`, refresh_token: `Bearer ${refreshToken}` }
            })

            expect(response.status).toBe(200)
        })
    })

    describe("get by tipo", () => {
        test("O método getByTipo deve estar definido", () => {
            expect(categoryController.getByTipo).toBeDefined()
        })

        test("O método getByTipo deve retornar status 200 em caso de sucesso", async () => {
            const { token, refreshToken } = await getTokens(TEST_PORT_CATEGORY_CONTROLLER as string)

            const response = await axiosInstance.get('/category', {
                headers: { authorization: `Bearer ${token}`, refresh_token: `Bearer ${refreshToken}` },
                params: { tipo: 'gasto' }
            })

            expect(response.status).toBe(200)
        })

        test("O método getByTipo deve retornar status 400 e mensagem em caso de erro", async () => {
            const { token, refreshToken } = await getTokens(TEST_PORT_CATEGORY_CONTROLLER as string)

            const response = await axiosInstance.get('/category/tipo', {
                headers: { authorization: `Bearer ${token}`, refresh_token: `Bearer ${refreshToken}` },
                params: { tipo: '' }
            })

            expect(response.data.erro).toBe('tipo deve ser um dos seguintes valores: "gasto" ou "receita"')
            expect(response.status).toBe(400)
        })

        describe("validação schema get by tipo", () => {
            const categoria_com_erro_validacao: ICategory = {
                userId: userId,
                nome: "nome categoria teste validação - add",
                tipo: "gasto",
                meta: 10
            }

            const backup_categoria_com_erro_validacao: ICategory = {
                userId: userId,
                nome: "nome categoria teste validação - add",
                tipo: "gasto",
                meta: 10
            }

            test("tipo - O método getByTipo deve retornar status 400 e mensagem em caso de 'tipo' inválido", async () => {
                const categoria: any = categoria_com_erro_validacao
                categoria.tipo = ""

                const { token, refreshToken } = await getTokens(TEST_PORT_CATEGORY_CONTROLLER as string)

                const response = await axiosInstance.put(`/category/${categoria.id}`, categoria, {
                    headers: { authorization: `Bearer ${token}`, refresh_token: `Bearer ${refreshToken}` }
                })

                expect(response.data.erro).toBe('tipo deve ser um dos seguintes valores: "gasto" ou "receita"')
                expect(response.status).toBe(400)
            })
        })
    })

    describe("add", () => {
        const nova_categoria: ICategory = {
            userId: userId,
            nome: "Youtube",
            tipo: "gasto",
            meta: 100
        }

        test("O método add deve estar definido", () => {
            expect(categoryController.add).toBeDefined()
        })

        test("O método add deve retornar status 201 em caso de sucesso", async () => {
            const { token, refreshToken } = await getTokens(TEST_PORT_CATEGORY_CONTROLLER as string)

            const response = await axiosInstance.post('/category', nova_categoria, {
                headers: { authorization: `Bearer ${token}`, refresh_token: `Bearer ${refreshToken}` },
            })

            expect(response.status).toBe(201)
        })

        test("O método add deve retornar status 400 com mensagem em caso de erro", async () => {
            nova_categoria.nome = "Internet"
            const { token, refreshToken } = await getTokens(TEST_PORT_CATEGORY_CONTROLLER as string)

            const response = await axiosInstance.post('/category', nova_categoria, {
                headers: { authorization: `Bearer ${token}`, refresh_token: `Bearer ${refreshToken}` },
            })

            expect(response.data.erro).toBe('categoria já existente')
            expect(response.status).toBe(400)
        })

        describe("validação schema add ", () => {
            const categoria_com_erro_validacao: ICategory = {
                userId: userId,
                nome: "nome categoria teste validação - add",
                tipo: "gasto",
                meta: 10
            }

            const backup_categoria_com_erro_validacao: ICategory = {
                userId: userId,
                nome: "nome categoria teste validação - add",
                tipo: "gasto",
                meta: 10
            }


            test("nome - O método add deve retornar status 400 e mensagem se nome não estiver definido", async () => {
                categoria_com_erro_validacao.nome = ""

                const { token, refreshToken } = await getTokens(TEST_PORT_CATEGORY_CONTROLLER as string)

                const response = await axiosInstance.put(`/category/${categoria_com_erro_validacao.id}`, categoria_com_erro_validacao, {
                    headers: { authorization: `Bearer ${token}`, refresh_token: `Bearer ${refreshToken}` }
                })

                expect(response.data.erro).toBe('nome da categoria é obrigatório')
                expect(response.status).toBe(400)

                categoria_com_erro_validacao.nome = backup_categoria_com_erro_validacao.nome
            })

            test("meta - O método add deve retornar status 400 e mensagem se meta não for number", async () => {
                categoria_com_erro_validacao.meta = "" as unknown as number

                const { token, refreshToken } = await getTokens(TEST_PORT_CATEGORY_CONTROLLER as string)

                const response = await axiosInstance.put(`/category/${categoria_com_erro_validacao.id}`, categoria_com_erro_validacao, {
                    headers: { authorization: `Bearer ${token}`, refresh_token: `Bearer ${refreshToken}` }
                })

                expect(response.data.erro).toBe('meta deve ser number')
                expect(response.status).toBe(400)

                categoria_com_erro_validacao.meta = backup_categoria_com_erro_validacao.meta
            })

            test("tipo - O método add deve retornar status 400 e mensagem se tipo não for nem 'gasto' e nem 'receita' ", async () => {
                const categoria: any = categoria_com_erro_validacao
                categoria.tipo = ""

                const { token, refreshToken } = await getTokens(TEST_PORT_CATEGORY_CONTROLLER as string)

                const response = await axiosInstance.put(`/category/${categoria.id}`, categoria, {
                    headers: { authorization: `Bearer ${token}`, refresh_token: `Bearer ${refreshToken}` }
                })

                expect(response.data.erro).toBe('tipo deve ser um dos seguintes valores: "gasto" ou "receita"')
                expect(response.status).toBe(400)
            })
        })
    })

    describe("update", () => {
        const nova_categoria: ICategory = {
            userId: userId,
            nome: "Cursos",
            tipo: "gasto",
            meta: 50
        }

        test("O método update deve estar definido", () => {
            expect(categoryController.update).toBeDefined()
        })

        test("O método update deve retornar status 200 em caso de sucesso", async () => {
            const { token, refreshToken } = await getTokens(TEST_PORT_CATEGORY_CONTROLLER as string)

            const addResponse = await axiosInstance.post('/category', nova_categoria, {
                headers: { authorization: `Bearer ${token}`, refresh_token: `Bearer ${refreshToken}` },
            })

            const category: ICategory = addResponse.data

            category.meta = 70

            const response = await axiosInstance.put(`/category/${category.id}`, category, {
                headers: { authorization: `Bearer ${token}`, refresh_token: `Bearer ${refreshToken}` }
            })

            expect(response.status).toBe(200)
        })

        test("O método deve retornar status 400 e mensagem em caso de erro", async () => {
            nova_categoria.id = "9607b28f-0f5c-4fb1-8b97-42779203432f"

            const { token, refreshToken } = await getTokens(TEST_PORT_CATEGORY_CONTROLLER as string)

            const response = await axiosInstance.put(`/category/${nova_categoria.id}`, nova_categoria, {
                headers: { authorization: `Bearer ${token}`, refresh_token: `Bearer ${refreshToken}` }
            })

            expect(response.data.erro).toBe('categoria inexistente')
            expect(response.status).toBe(400)
        })

        describe("validação schema update", () => {
            const invalid_id = "493da7e8-ba3b-4468-aac4-0425dd9f79a9"

            const categoria_com_erro_validacao: ICategory = {
                userId: userId,
                nome: "nome categoria teste validação - update",
                tipo: "gasto",
                meta: 10,
                id: invalid_id
            }

            const backup_categoria_com_erro_validacao: ICategory = {
                userId: userId,
                nome: "nome categoria teste validação - update",
                tipo: "gasto",
                meta: 10,
                id: invalid_id
            }

            test("id - O método deve retornar status 400 e mensagem em caso de id não for uuid", async () => {
                categoria_com_erro_validacao.id = "invalid category id"

                const { token, refreshToken } = await getTokens(TEST_PORT_CATEGORY_CONTROLLER as string)

                const response = await axiosInstance.put(`/category/${categoria_com_erro_validacao.id}`, categoria_com_erro_validacao, {
                    headers: { authorization: `Bearer ${token}`, refresh_token: `Bearer ${refreshToken}` }
                })

                expect(response.data.erro).toBe('id deve ser uuid')
                expect(response.status).toBe(400)

                categoria_com_erro_validacao.id = backup_categoria_com_erro_validacao.id
            })

            test("meta - O método deve retornar status 400 e mensagem em caso de meta não for number", async () => {
                const { token, refreshToken } = await getTokens(TEST_PORT_CATEGORY_CONTROLLER as string)
                categoria_com_erro_validacao.meta = "minha meta" as unknown as number

                const response = await axiosInstance.put(`/category/${categoria_com_erro_validacao.id}`, categoria_com_erro_validacao, {
                    headers: { authorization: `Bearer ${token}`, refresh_token: `Bearer ${refreshToken}` }
                })

                expect(response.data.erro).toBe('meta deve ser number')
                expect(response.status).toBe(400)

                categoria_com_erro_validacao.meta = backup_categoria_com_erro_validacao.meta
            })

            test("nome - O método deve retornar status 400 e mensagem em caso de nome não estiver definido", async () => {
                const { token, refreshToken } = await getTokens(TEST_PORT_CATEGORY_CONTROLLER as string)
                categoria_com_erro_validacao.nome = ""

                const response = await axiosInstance.put(`/category/${categoria_com_erro_validacao.id}`, categoria_com_erro_validacao, {
                    headers: { authorization: `Bearer ${token}`, refresh_token: `Bearer ${refreshToken}` }
                })

                expect(response.data.erro).toBe('nome da categoria é obrigatório')
                expect(response.status).toBe(400)

                categoria_com_erro_validacao.nome = backup_categoria_com_erro_validacao.nome
            })

            test("tipo - O método deve retornar status 400 e mensagem em caso de tipo não estiver for nem 'gasto' e nem 'receita' ", async () => {
                const { token, refreshToken } = await getTokens(TEST_PORT_CATEGORY_CONTROLLER as string)
                const categoria: any = categoria_com_erro_validacao
                categoria.tipo = ""

                const response = await axiosInstance.put(`/category/${categoria.id}`, categoria, {
                    headers: { authorization: `Bearer ${token}`, refresh_token: `Bearer ${refreshToken}` }
                })

                expect(response.data.erro).toBe('tipo deve ser um dos seguintes valores: "gasto" ou "receita"')
                expect(response.status).toBe(400)
            })
        })
    })

    describe("delete", () => {
        const categoryId = "9607b28f-0f5c-4fb1-8b97-42779203432f"

        test("O método delete deve estar definido", () => {
            expect(categoryController.delete).toBeDefined()
        })

        test("O método delete deve retornar status 200 em caso de sucesso", async () => {
            const { token, refreshToken } = await getTokens(TEST_PORT_CATEGORY_CONTROLLER as string)

            const response = await axiosInstance.delete(`/category/${categoryId}`, {
                headers: { authorization: `Bearer ${token}`, refresh_token: `Bearer ${refreshToken}` }
            })

            expect(response.status).toBe(200)
        })

        describe("validação schema delete", () => {
            test("O método delete deve retornar status 400 e mensagem em caso de categoryId não for uuid", async () => {
                const { token, refreshToken } = await getTokens(TEST_PORT_CATEGORY_CONTROLLER as string)
                const invalid_category_id = "10287321638726"

                const response = await axiosInstance.delete(`/category/${invalid_category_id}`, {
                    headers: { authorization: `Bearer ${token}`, refresh_token: `Bearer ${refreshToken}` }
                })

                expect(response.data.erro).toBe('id deve ser uuid')
                expect(response.status).toBe(400)
            })
        })
    })
})