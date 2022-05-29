import { Request, Response } from "express"
import { UserModel } from "../database/models/userModels";
import { ValidadorCPF } from "../utils/validoresUtil";
import  BodyUser from "../entity/usuarioInterface"
export default class UserControllerRest {

  private erroJson = [];
  
  private retornErr () {
    return {"message": this.erroJson};
  }

  public async getUser(req: Request, res: Response) {

    try {

      const acesso = {
        email: req.body.pemail,
        senha: req.body.psenha
      }

      !acesso.email ? this.erroJson.push('Esta faltando o campo do email!') : null;
      !acesso.senha ? this.erroJson.push('Esta faltando o campo da senha!') : null;
      

      if (!this.erroJson) {
        console.log(this.erroJson)
        return res.status(400)
                  .json(this.retornErr());
      }

      let usuario:Object = await UserModel.findOne({ where: acesso });

      if (usuario == null) {
        return res.status(404)
          .json({ "message": "Usuário não encontrado!" });
      }
      let t = new ValidadorCPF('13994176492');
      t.validar();

      return res.status(200).json(usuario);

    } catch (e) {
      return res.status(500)
        .json({ "message": "Erro no servidor, por favor consulte os administradores" });
    }

  }

  public async postUser (req: Request, res: Response) {
    try {

      var payload:BodyUser =  <BodyUser> {};

      payload.nome         = req.body.nome;    
      payload.cpf          = req.body.cpf;
      payload.nascimento   = req.body.nascimento;  
      payload.email        = req.body.email;       
      payload.senha        = req.body.senha;      
      payload.tipo_usuario = req.body.tipo_usuario;
      payload.saldo        = req.body.saldo;     
      payload.endereco     = req.body.endereco;
      payload.telefone     = req.body.telefone;

      !payload.nome       ? this.erroJson.push('Esta faltando o campo do nome!')       : null;
      !payload.cpf        ? this.erroJson.push('Esta faltando o campo do cpf!')        : null;
      !payload.nascimento ? this.erroJson.push('Esta faltando o campo do nascimento!') : null;
      !payload.email      ? this.erroJson.push('Esta faltando o campo da email!')      : null;
      !payload.senha      ? this.erroJson.push('Esta faltando o campo da senha!')      : null;
      !payload.endereco   ? this.erroJson.push('Esta faltando o campo do endereço!')   : null;

      if (!this.erroJson) {
        console.log(this.erroJson)
        return res.status(400)
                   .json(this.retornErr());
      }

      const creatUser = await UserModel.create(Object(payload));
      return res.status(201).json(creatUser);

    } catch (e) {
      if (e.message == "Validation error"){
        return res.status(403)
                   .json({ "message": "Já existe um usuário usando este e-mail ou CPF!"})
      }
      return res.status(500)
      .json({ "message": "Erro no servidor, por favor consulte os administradores!"})
    }

  }

  public async putUser(req: Request, res: Response) {

    try {

      const acesso = {
        email: req.body.pemail,
        senha: req.body.psenha
      }

      const payload = {}

      req.body.dados.nome         ? payload["nome"] = req.body.dados.nome : null
      req.body.dados.cpf          ? payload["cpf"] = req.body.dados.cpf : null
      req.body.dados.nascimento   ? payload["nascimento"] = req.body.dados.nascimento : null
      req.body.dados.email        ? payload["email"] = req.body.dados.email : null
      req.body.dados.senha        ? payload["senha"] = req.body.dados.senha : null
      req.body.dados.saldo        ? payload["saldo"] = req.body.dados.saldo : null
      req.body.dados.tipo_usuario ? payload["tipo_usuario"] = req.body.dados.tipo_usuario : null
      req.body.dados.endereco     ? payload["endereco"] = req.body.dados.endereco : null
      req.body.dados.telefone     ? payload["telefone"] = req.body.dados.telefone : null

      if(!acesso.email){
        this.erroJson.push('Esta faltando o campo do email!')
      }if (!acesso.senha){
        this.erroJson.push('Esta faltando o campo da senha!')
      }

      if (!this.erroJson) {
        console.log(this.erroJson)
        return res.status(400)
                  .json(this.retornErr());
      }

      let updateUser = await UserModel.update(payload, { where: acesso });
      console.log(updateUser)
      if(+updateUser == 0){
        return res.status(404).json({"message":"Usuario não encontrado..."});
      }
      return res.status(200).json({"message":"Dados atualizados com sucesso!"});

    } catch (e) {
      return res.status(500)
        .json({ "message": "Erro no servidor, por favor consulte os administradores" })
    }

  }

  public async deleteUser(req: Request, res: Response) {

    try {

      const acesso = {
        email: req.body.pemail,
        senha: req.body.psenha
      }

      !acesso.email ? this.erroJson.push('Esta faltando o campo do email!') : null;
      !acesso.senha ? this.erroJson.push('Esta faltando o campo da senha!') : null;
      
      if (!this.erroJson) {
        console.log(this.erroJson)
        return res.status(400)
                  .json(this.retornErr());
      }

      await UserModel.destroy({ where: acesso });
      return res.status(204)
        .json({ "message": "usuario deletado com sucesso!" });

    } catch (e) {
      return res.status(500)
        .json({ "message": "Erro no servidor, por favor consulte os administradores" });
    }

  }

}
