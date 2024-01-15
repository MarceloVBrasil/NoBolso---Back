import { variaveisAmbiente } from "../../utils/EnvironmentVariables";
import server from "../../server";
import { AuthController } from "../AuthController";
import { createAxiosInstance } from "./helpers/axiosInstance";

const authController = new AuthController()
const { TEST_PORT_AUTH_CONTROLLER } = variaveisAmbiente
const axiosInstance = createAxiosInstance(TEST_PORT_AUTH_CONTROLLER as string)

const serverInstance = server.listen(TEST_PORT_AUTH_CONTROLLER)

beforeAll((done) => {
    serverInstance.on("listening", () => done())
})

afterAll((done) => {
    serverInstance.close(() => done())
})

describe("Auth Controller", () => {
    test("classe AuthController deve estar definida", () => {
        expect(AuthController).toBeDefined()
    })

    describe("login", () => {
        test("O método login deve estar definido", () => {
            expect(authController.login).toBeDefined
        })

        test("O método login deve retornar status 200 em casso de sucesso", async () => {
            const response = await axiosInstance.post('/login', { email: 'marcelo.vital.brasil@gmail.com', senha: '123' })
            expect(response.status).toBe(200)
        })

        test("O método login deve retornar status 400 caso as credenciais estejam inválidas", async () => {
            const response = await axiosInstance.post('/login', { email: 'marcelo.vital.brasil@gmail.com', senha: '736245' })
            expect(response.status).toBe(400)
        })

        describe("validação schema login", () => {
            test("email - O método login deve retornar status 400 e mensagem caso email não seja enviado corretamente", async () => {
                const response = await axiosInstance.post('/login', { email: 'email', senha: '123' })
                expect(response.data.erro).toBe('email inválido')
                expect(response.status).toBe(400)
            })

            test("senha - O método login deve retornar status 400 e mensagem caso senha não seja enviado corretamente", async () => {
                const response = await axiosInstance.post('/login', { email: 'marcelo.vital.brasil@gmail.com' })
                expect(response.data.erro).toBe('senha é obrigatória')
                expect(response.status).toBe(400)
            })
        })
    })

    describe("cadastrar", () => {
        test("O método cadastrar deve estar definido", () => {
            expect(authController.cadastrar).toBeDefined()
        })

        test("O método cadastrar deve retornar status 201 em caso de sucesso", async () => {
            const novo_usuario = {
                nome: 'Dummy User',
                email: 'dummy.user@teste.com.br',
                confirmarEmail: 'dummy.user@teste.com.br',
                senha: '123',
                confirmarSenha: '123',
            }

            const response = await axiosInstance.post('/cadastrar', novo_usuario)
            expect(response.status).toBe(201)
        })

        test("O método cadastrar deve retornar status 400 e mensagem caso o email já exista", async () => {
            const novo_usuario = {
                nome: 'Dummy User',
                email: 'marcelo.vital.brasil@gmail.com',
                confirmarEmail: 'marcelo.vital.brasil@gmail.com',
                senha: '123',
                confirmarSenha: '123',
            }

            const response = await axiosInstance.post('/cadastrar', novo_usuario)

            expect(response.data.erro).toBe('Email já cadastrado')
            expect(response.status).toBe(400)
        })

        describe("validação schema cadastrar", () => {
            test("email - O método cadastrar deve retornar status 400 e mensagem caso o email e sua confirmação estejam diferentes", async () => {
                const novo_usuario = {
                    nome: 'Dummy User',
                    email: 'dummy.user@teste.com.br',
                    confirmarEmail: 'user.dummy@teste.com.br',
                    senha: '123',
                    confirmarSenha: '123',
                }

                const response = await axiosInstance.post('/cadastrar', novo_usuario)

                expect(response.data.erro).toBe('email de confirmação tem que ser igual a email')
                expect(response.status).toBe(400)
            })

            test("email - O método cadastrar deve retornar status 400 e mensagem caso o email não seja enviado corretamente", async () => {
                const novo_usuario = {
                    nome: 'Dummy User',
                    email: 'dummy user email',
                    confirmarEmail: 'dummy user email',
                    senha: '123',
                    confirmarSenha: '123',
                }

                const response = await axiosInstance.post('/cadastrar', novo_usuario)

                expect(response.data.erro).toBe('email inválido')
                expect(response.status).toBe(400)
            })

            test("senha - O método cadastrar deve retornar status 400 e mensagem caso o senha e sua confirmação estejam diferentes", async () => {
                const novo_usuario = {
                    nome: 'Dummy User',
                    email: 'dummy.user@teste.com.br',
                    confirmarEmail: 'dummy.user@teste.com.br',
                    senha: '123',
                    confirmarSenha: '321',
                }

                const response = await axiosInstance.post('/cadastrar', novo_usuario)

                expect(response.data.erro).toBe('senha de confirmação tem que ser igual a senha')
                expect(response.status).toBe(400)
            })
        })
    })
})