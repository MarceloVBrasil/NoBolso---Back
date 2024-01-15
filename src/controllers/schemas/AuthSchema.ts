import { InferType, object, ref, string } from "yup"

import { validateName } from "./helpers/validateName"

const LoginSchema = object().shape({
    email: string().email("email inválido").required("email é obrigatório"),
    senha: string().required("senha é obrigatória")
})

const CadastrarSchema = object().shape({
    nome: string().required('nome é obrigatório').test("validar nome", "nome inválido", (name) => validateName(name)),
    email: string().email("email inválido").required("email é obrigatório"),
    senha: string().required("senha é obrigatória"),
    confirmarEmail: string().oneOf([ref('email')], 'email de confirmação tem que ser igual a email').required("email de confirmação é obrigatório"),
    confirmarSenha: string().oneOf([ref('senha')], 'senha de confirmação tem que ser igual a senha').required("senha de confirmação é obrigatória"),
})

const refreshTokenSchema = object().shape({
    token: string().required('token é obrigatório'),
    refreshToken: string().required('refresh token é obrigatório')
})

function loginSchema() {
    return LoginSchema
}

function cadastrarSchema() {
    return CadastrarSchema
}

type LoginSchemaType = InferType<typeof LoginSchema>;
type CadastrarSchemaType = InferType<typeof CadastrarSchema>;
type RefreshTokenType = InferType<typeof refreshTokenSchema>;

export { loginSchema, cadastrarSchema, LoginSchemaType, CadastrarSchemaType, RefreshTokenType }