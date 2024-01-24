import { InMemoryRevenueRepository } from "../../repository/inMemory/InMemoryRevenueRepository";
import { PrismaRevenueRepository } from "../../repository/prisma/PrismaRevenueRepository";
import { RevenueService } from "../RevenueService";

let revenueServiceInstance: RevenueService | null = null

export function RevenueFactory() {
    if (!revenueServiceInstance) {
        revenueServiceInstance = new RevenueService(
            new PrismaRevenueRepository()
        )
    }

    return revenueServiceInstance
}