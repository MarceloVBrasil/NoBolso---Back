import { InMemoryCategoryRepository } from "../../repository/inMemory/InMemoryCategoryRepository";
import { PrismaCategoryRepository } from "../../repository/prisma/PrismaCategoryRepository";
import { CategoryService } from "../CategoryService";

let categoryService: CategoryService | null = null;

export function CategoryFactory() {
    if (!categoryService) {

        categoryService = new CategoryService(
            new InMemoryCategoryRepository(),
        )
    }
    return categoryService
}