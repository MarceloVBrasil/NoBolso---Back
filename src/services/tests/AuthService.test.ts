import { IUser } from "../../models/User";
import { InMemoryUserRepository } from "../../repository/inMemory/InMemoryUserRepository"
import { AuthService } from "../AuthServices";

const authService = new AuthService(new InMemoryUserRepository())

describe("AuthService", () => {
    test("classe AuthService deve estart definida", () => {
        expect(AuthService).toBeDefined()
    })

    describe("Login", () => {
        const email = "marcelo.vital.brasil@gmail.com"
        const senha = "123"

        test("O método login deve estar definido", () => {
            expect(authService.login).toBeDefined()
        })

        test("o método login deve logar um usuário", async () => {
            const seUsuarioFezLogin = await authService.login({ email, senha })
            expect(seUsuarioFezLogin).toHaveProperty('token')
        })

        test("o método login deve dar erro caso o email esteja inválido", async () => {
            expect(authService.login({ email: '', senha })).rejects.toThrow(new Error('Email e/ou senha inválidos'))
        })

        test("o método login deve dar erro caso a senha esteja inválida", async () => {
            expect(authService.login({ email, senha: '' })).rejects.toThrow(new Error('Email e/ou senha inválidos'))
        })
    })

    describe("Cadastrar", () => {
        const user: IUser = {
            nome: 'Marcelo Depes Vital Brasil',
            senha: '123',
            email: 'marcelovitalbrasil92@gmail.com',
        }

        test("O método cadastrar deve estar definido", () => {
            expect(authService.cadastrar).toBeDefined()
        })

        test("o método cadastrar deve cadastrar um usuário", async () => {
            const newUser = await authService.cadastrar(user)
            expect(newUser).toHaveProperty('id')
        })

        test("o método cadastrar deve dar erro caso o email já exista", async () => {
            user.email = "marcelo.vital.brasil@gmail.com"
            expect(authService.cadastrar(user)).rejects.toThrow(new Error('Email já cadastrado'))
        })
    })

    describe("update", () => {
        const user: IUser = {
            nome: 'Marcelo Depes Vital Brasil',
            senha: '123',
            email: 'marcelodvbrasil@icloud.com',
            id: 'dfd5d673-a960-4a76-9fb2-5a71ceae796f'
        }

        const user_email_ja_cadastrado: IUser = {
            nome: 'Daniele Vital Brasil',
            senha: '123',
            email: 'marcelodvbrasil@icloud.com',
            id: 'afbb6e7f-a184-48ed-808e-41813a82f187'
        }

        test("O método update deve estar definido", () => {
            expect(authService.update).toBeDefined()
        })

        test("o método update deve atualizar um usuário", async () => {
            const updatedUser = await authService.update(user.id as string, user)
            expect(updatedUser.email).toBe(user.email)
        })

        test("o método update deve dar erro caso o usuário não exista", async () => {
            user.id = ""
            expect(authService.update(user.id as string, user)).rejects.toThrow(new Error('Usuário não cadastrado'))
        })

        test("O método update deve dar erro caso o email novo pertença a outro usuário", () => {
            expect(authService.update(user_email_ja_cadastrado.id as string, user_email_ja_cadastrado)).rejects.toThrow(
                new Error('Email já cadastrado')
            )
        })
    })

    describe("delete", () => {
        const userId = 'afbb6e7f-a184-48ed-808e-41813a82f187'

        const user: IUser = {
            nome: 'Daniele Vital Brasil',
            senha: '123',
            email: 'delete.teste@gmail.com',
            id: userId
        }

        test("O método delete deve estar definido", () => {
            expect(authService.delete).toBeDefined()
        })

        test("O método delete deve excluir um usuário", async () => {
            await authService.delete(userId)
            const newUser = await authService.cadastrar(user)

            expect(newUser).toHaveProperty('id')
        })
    })
})