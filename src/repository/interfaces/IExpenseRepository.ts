import { IExpense } from "../../models/Expenses";
import { IGetByMonthGroupedByCategory, IGetByMonthIndividually, IGetTotalGroupedByDate } from "./IMethods";

export interface IExpenseRepository {
    getTotalGroupedByDate(userId: string, startDate: Date, endDate: Date): Promise<IGetTotalGroupedByDate[]>
    getByMonthGroupedByCategory(userId: string, month: number, year: number): Promise<IGetByMonthGroupedByCategory[]>
    getByMonthIndividually(userId: string, month: number, year: number): Promise<IGetByMonthIndividually[]>
    add(expense: IExpense): Promise<IExpense>
    update(expenseId: string, expense: IExpense): Promise<IExpense>
    delete(expenseId: string): Promise<string>
}