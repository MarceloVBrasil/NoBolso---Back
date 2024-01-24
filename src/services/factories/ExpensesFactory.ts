import { InMemoryExpensesRepository } from "../../repository/inMemory/InMemoryExpensesRepository";
import { PrismaExpensesRepository } from "../../repository/prisma/PrismaExpenseRepository";
import { ExpensesService } from "../ExpensesService";

let expenseService: ExpensesService | null = null

export function ExpensesFactory() {
    if (!expenseService) {
        expenseService = new ExpensesService(
            new PrismaExpensesRepository()
        )
    }

    return expenseService
}