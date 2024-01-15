import { CategoryService } from "../CategoryService";
import { InMemoryCategoryRepository } from "../../repository/inMemory/InMemoryCategoryRepository"
import { CategoriaTipo, ICategory } from "../../models/Category";

const categoryService = new CategoryService(new InMemoryCategoryRepository())

const userId = 'dfd5d673-a960-4a76-9fb2-5a71ceae796f'

describe("Category Service", () => {
    test("A classe CategoryService deve estar definida", () => {
        expect(CategoryService).toBeDefined()
    })

    describe("get all", () => {
        test("O método getAll deve estar definido", () => {
            expect(categoryService.getAll).toBeDefined()
        })

        test("Deve retornar todas categorias", async () => {
            const categories = await categoryService.getAll(userId)
            const somente_receita_categories = categories.every(c => c.tipo == 'receita')
            const somente_gasto_categories = categories.every(c => c.tipo == 'gasto')

            expect(categories.length).toBeGreaterThan(0)
            expect(somente_gasto_categories).toBeFalsy()
            expect(somente_receita_categories).toBeFalsy()
        })

        test("Deve retornar um array vazio caso o userId não existir", async () => {
            const categories = await categoryService.getAll('inexistent user id')
            expect(categories.length).toBe(0)
        })
    })

    describe("get by tipo", () => {
        test("O método getByTipo deve estar definido", () => {
            expect(categoryService.getByTipo).toBeDefined()
        })

        test("Deve retornar somente categorias do tipo gasto", async () => {
            const categories = await categoryService.getByTipo(userId, 'gasto')
            const somente_gasto_categories = categories.every(c => c.tipo == 'gasto')
            expect(somente_gasto_categories).toBeTruthy()
        })

        test("Deve retornar somente categorias do tipo receita", async () => {
            const categories = await categoryService.getByTipo(userId, 'receita')
            const somente_receita_categories = categories.every(c => c.tipo == 'receita')
            expect(somente_receita_categories).toBeTruthy()
        })
    })

    describe("check existence", () => {
        const existent_category: { nome: string, tipo: CategoriaTipo } = { nome: "Internet", tipo: "gasto" }
        const inexistent_category: { nome: string, tipo: CategoriaTipo } = { nome: "Inexistent category", tipo: "gasto" }

        test("O método checkExistence deve estar definido", () => {
            expect(categoryService.checkExistence).toBeDefined()
        })

        test("O método checkExistence deve estar definido", async () => {
            const categoriaExiste = await categoryService.checkExistence(existent_category.nome, existent_category.tipo)
            expect(categoriaExiste).toBeTruthy()
        })

        test("O método getByTipo deve estar definido", async () => {
            const categoriaNaoExiste = await categoryService.checkExistence(inexistent_category.nome, inexistent_category.tipo)
            expect(categoriaNaoExiste).toBeFalsy()
        })
    })

    describe("add", () => {
        const category_inexistent: ICategory = {
            userId: userId,
            nome: "Relógios",
            tipo: "receita",
            meta: 1000
        }

        const category_existent: ICategory = {
            userId: userId,
            nome: "Internet",
            tipo: "gasto",
            meta: 1000
        }

        test("O método add deve estar definido", () => {
            expect(categoryService.add).toBeDefined()
        })

        test("O método add deve adicionar uma categoria com sucesso", async () => {
            const newCategory = await categoryService.add(category_inexistent)
            const ifCategoryExists = await categoryService.checkExistence(newCategory.nome, newCategory.tipo)
            expect(ifCategoryExists).toBeTruthy()

            await categoryService.delete(newCategory.id as string)
        })

        test("O método add deve dar erro ao tentar adicionar uma categoria já existente", async () => {
            expect(categoryService.add(category_existent)).rejects.toThrow(new Error('categoria já existente'))
        })

        test("O método add deve adcionar uma receita com meta = 0", async () => {
            const newCategory = await categoryService.add(category_inexistent)
            expect(newCategory.meta).toBe(0)

            await categoryService.delete(newCategory.id as string)
        })
    })

    describe("update", () => {
        const category_inexistent: ICategory = {
            userId: userId,
            nome: "Relógios",
            tipo: "gasto",
            meta: 2000
        }

        const category_existent: ICategory = {
            userId: userId,
            nome: "Internet",
            tipo: "gasto",
            meta: 1000
        }

        test("O método update deve estar definido", () => {
            expect(categoryService.update).toBeDefined()
        })

        test("O método update deve atualizar uma categoria com sucesso", async () => {
            const newCategory = await categoryService.add(category_inexistent)
            newCategory.meta = 1000

            await categoryService.update(newCategory.id as string, newCategory)

            const updatedCategory = await categoryService.getById(newCategory.id as string)

            expect(updatedCategory?.meta).toBe(1000)

            await categoryService.delete(newCategory.id as string)
        })

        test("O método update deve dar erro ao tentar adicionar uma categoria inexistente", async () => {
            expect(categoryService.update('inexistent category id', category_existent)).rejects.toThrow(new Error('categoria inexistente'))
        })

        test("O método update ao mudar o tipo da categoria para receita, deve setar meta = 0", async () => {
            const newCategory = await categoryService.add(category_inexistent)
            newCategory.tipo = 'receita'

            await categoryService.update(newCategory.id as string, newCategory)

            expect(newCategory.meta).toBe(0)

            await categoryService.delete(newCategory.id as string)
        })
    })

    describe("delete", () => {
        const category_inexistent: ICategory = {
            userId: userId,
            nome: "Relógios",
            tipo: "gasto",
            meta: 2000
        }

        test("O método delete deve estar definido", () => {
            expect(categoryService.delete).toBeDefined()
        })

        test("O método delete deve remover uma categoria com sucesso", async () => {
            const newCategory = await categoryService.add(category_inexistent)
            await categoryService.delete(newCategory.id as string)
            const seCategoriaExiste = await categoryService.checkExistence(newCategory.nome, newCategory.tipo)

            expect(seCategoriaExiste).toBeFalsy()
        })
    })
});