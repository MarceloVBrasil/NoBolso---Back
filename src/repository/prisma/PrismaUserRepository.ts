import { PrismaClient } from "@prisma/client"

import { IUser } from "../../models/User"
import { IUserRepository } from "../interfaces/IUserRepository"

export class PrismaUserRepository implements IUserRepository {
    private prisma: PrismaClient = new PrismaClient()

    constructor() {

    }
    async getById(userId: string): Promise<IUser | null> {
        return await this.prisma.user.findUnique({
            where: { id: userId },
        })
    }
    async getByEmail(email: string): Promise<IUser | null> {
        return await this.prisma.user.findUnique({
            where: { email },
        })
    }

    async add(user: IUser): Promise<IUser> {
        return await this.prisma.user.create({ data: { senha: user.senha!, ...user } })
    }

    async update(userId: string, user: IUser): Promise<IUser> {
        return await this.prisma.user.update({ where: { id: userId }, data: user })
    }

    async delete(userId: string): Promise<string> {
        const user = await this.prisma.user.delete({ where: { id: userId } })
        return user.id
    }
}