interface BodyUser {
  nome: string,
  cpf: string,
  nascimento: string,
  email: string,
  senha: string,
  tipo_usuario: string,
  saldo: number,
  endereco: string,
  telefone?: string
}

export default BodyUser;