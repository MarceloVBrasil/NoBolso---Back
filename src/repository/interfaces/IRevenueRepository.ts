import { IRevenue } from "../../models/Revenue";
import { IGetByMonthGroupedByCategory, IGetByMonthIndividually, IGetTotalGroupedByDate } from "./IMethods";

export interface IRevenueRepository {
    getTotalGroupedByDate(userId: string, startDate: Date, endDate: Date): Promise<IGetTotalGroupedByDate[]>
    getByMonthGroupedByCategory(userId: string, month: number, year: number): Promise<IGetByMonthGroupedByCategory[]>
    getByMonthIndividually(userId: string, month: number, year: number): Promise<IGetByMonthIndividually[]>
    add(revenue: IRevenue): Promise<IRevenue>
    update(revenueId: string, revenue: IRevenue): Promise<IRevenue>
    delete(revenueId: string): Promise<string>
}