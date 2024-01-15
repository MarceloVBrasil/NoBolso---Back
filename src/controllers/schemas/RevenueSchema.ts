import { date, number, object, string } from "yup";

const UserIdMonthYearCategoriaValorRequired = object().shape({
    userId: string().uuid('userId deve ser uuid').required('userId é obrigatório'),
    month: number().min(1, 'month deve ser um número entre 1 e 12').max(12, 'month deve ser um número entre 1 e 12').required('month é obrigatório'),
    year: number().min(2023, 'year não pode ser menor que 2023').max(new Date().getFullYear(), 'year não pode ser maior que o ano atual').required('year é obrigatório'),
    categoryId: string().uuid('categoryId deve ser uuid').required('categoryId é obrigatório'),
    total: number().typeError('total deve ser number').positive('total tem que ser maior que zero').required('total é obrigatório')
})

const UserIdMonthYearRequired = object().shape({
    userId: string().required('userId é obrigatório'),
    month: number().min(1, 'month deve ser um número entre 1 e 12').max(12, 'month deve ser um número entre 1 e 12').required('month é obrigatório'),
    year: number().min(2023, 'year não pode ser menor que 2023').max(new Date().getFullYear(), 'year não pode ser maior que o ano atual').required('year é obrigatório')
})

const userIdStartDateEndDateRequired = object().shape({
    userId: string().uuid('userId deve ser uuid').required('userId é obrigatório'),
    startDate: date().typeError('startDate deve ser um Date').required('startDate é obrigatório'),
    endDate: date().typeError('endDate deve ser um Date').required('endDate é obrigatório'),
})

const RevenueWithId = object().shape({
    id: string().uuid('id deve ser uuid').required('id é obrigatório'),
    userId: string().uuid('userId deve ser uuid').required('userId é obrigatório'),
    categoryId: string().uuid('categoryId deve ser uuid').required('id da categoria é obrigatório'),
    total: number().typeError('total deve ser number').positive('total tem que ser maior que zero').required('total é obrigat;orio'),
    year: number().min(2023, 'year não pode ser menor que 2023').max(new Date().getFullYear(), 'year não pode ser maior que o ano atual').required('year é obrigatória'),
    month: number().min(1, 'month deve ser um número entre 1 e 12').max(12, 'month deve ser um número entre 1 e 12').required('data é obrigatória'),
})

const IdRequired = object().shape({
    id: string().uuid('id deve ser uuid').required('id obrigatório')
})

function getByMonthSchema() {
    return UserIdMonthYearRequired
}

function getTotalGroupedByDateSchema() {
    return userIdStartDateEndDateRequired
}

function addRevenueSchema() {
    return UserIdMonthYearCategoriaValorRequired
}

function deleteRevenueSchema() {
    return IdRequired
}

function updateRevenueSchema() {
    return RevenueWithId
}

export { getByMonthSchema, addRevenueSchema, getTotalGroupedByDateSchema, deleteRevenueSchema, updateRevenueSchema }