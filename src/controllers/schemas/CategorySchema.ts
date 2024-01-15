import { InferType, number, object, string } from "yup"

const IdRequiredSchema = object().shape({
    userId: string().required('userId é obrigatório').uuid('userId deve ser uuid')
})

const deleteSchema = object().shape({
    id: string().required('id é obrigatório').uuid('id deve ser uuid'),
    userId: string().required('userId é obrigatório').uuid('userId deve ser uuid'),
})

const tipoRequiredSchema = object().shape({
    userId: string().required('userId é obrigatório').uuid('userId deve ser uuid'),
    tipo: string().oneOf(['gasto', 'receita'], 'tipo deve ser um dos seguintes valores: "gasto" ou "receita"').required('tipo é obrigatório')
})

const categoryWithoutId = object().shape({
    userId: string().required('userId é obrigatório').uuid('userId deve ser uuid'),
    nome: string().required('nome da categoria é obrigatório'),
    meta: number().typeError('meta deve ser number').default(0).test("validação da meta", "meta não pode ser negativa", meta => meta >= 0),
    tipo: string().oneOf(['gasto', 'receita'], 'tipo deve ser um dos seguintes valores: "gasto" ou "receita"').required()
})

const categoryWithId = object().shape({
    id: string().required('id é obrigatório').uuid('id deve ser uuid'),
    userId: string().required('userId é obrigatório').uuid('userId deve ser uuid'),
    nome: string().required('nome da categoria é obrigatório'),
    meta: number().typeError('meta deve ser number').positive('meta tem que ser um total positivo'),
    tipo: string().oneOf(['gasto', 'receita'], 'tipo deve ser um dos seguintes valores: "gasto" ou "receita"').required().test("tipo de categoria inválido", tipo => tipo === 'gasto' || tipo === 'receita')
})

function getAllCategoriesSchema() {
    return IdRequiredSchema
}

function getCategoriasByTipoSchema() {
    return tipoRequiredSchema
}

function addCategorySchema() {
    return categoryWithoutId
}

function updateCategorySchema() {
    return categoryWithId
}

function deleteCategorySchema() {
    return deleteSchema
}

type CategorySchemaType = InferType<typeof categoryWithoutId>

export { addCategorySchema, getCategoriasByTipoSchema, updateCategorySchema, deleteCategorySchema, getAllCategoriesSchema, CategorySchemaType }