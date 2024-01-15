import { IUser } from "../../models/User";
import { IUserRepository } from "../interfaces/IUserRepository";

export class InMemoryUserRepository implements IUserRepository {
    private _users: IUser[] = []

    constructor() {
        this._users = [
            {
                id: 'dfd5d673-a960-4a76-9fb2-5a71ceae796f',
                nome: "Marcelo Brasil",
                email: "marcelo.vital.brasil@gmail.com",
                senha: "$2b$10$q6B0HPd3Ai9wMLQyOfFWJunZ3P0fsk/30ChXtXvToEsK6tBMyIRD.", // 123,
                createdAt: new Date('01/01/2023'),
                updatedAt: new Date('01/01/2023'),
            },
            {
                id: 'afbb6e7f-a184-48ed-808e-41813a82f187',
                nome: "Daniele Vital Brasil",
                email: "daniele.vital.brasil.com",
                senha: "$2b$10$q6B0HPd3Ai9wMLQyOfFWJunZ3P0fsk/30ChXtXvToEsK6tBMyIRD.", // 123,
                createdAt: new Date('01/01/2023'),
                updatedAt: new Date('01/01/2023'),
            }
        ]
    }
    async getById(userId: string): Promise<IUser | null> {
        const user = this._users.find(user => user.id === userId)
        return user || null
    }

    async getByEmail(email: string): Promise<IUser | null> {
        const user = this._users.find(user => user.email == email)
        return user || null
    }

    async add(user: IUser): Promise<IUser> {
        this._users.push(user)
        return user
    }

    async update(userId: string, user: IUser): Promise<IUser> {
        const userIndex = this._users.findIndex(user => user.id == userId)
        this._users[userIndex] = { id: userId, ...user }
        return this._users[userIndex]
    }

    async delete(userId: string): Promise<string> {
        this._users = this._users.filter(user => user.id != userId)
        return userId
    }
}