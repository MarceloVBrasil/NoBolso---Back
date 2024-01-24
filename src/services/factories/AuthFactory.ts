import { InMemoryUserRepository } from "../../repository/inMemory/InMemoryUserRepository";
import { PrismaUserRepository } from "../../repository/prisma/PrismaUserRepository";
import { AuthService } from "../AuthServices";

let authService: AuthService | null = null

export function AuthFactory() {
    if (!authService) {

        authService = new AuthService(new InMemoryUserRepository())
    }

    return authService
}