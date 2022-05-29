import { DataTypes } from "sequelize";
import { connectDB } from "../db";

export const UserModel = connectDB.define("tb_usuarios", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cpf: {
    type: DataTypes.STRING(14),
    allowNull: false,
    unique: true
  },
  nascimento: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  senha: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  tipo_usuario: {
    type: DataTypes.STRING(2),
    allowNull: false,
    defaultValue: 'C',
    comment: 'C - Cliente / T - Trabalhador / CT - Cliente que virou Trabalhador'
  },
  saldo: {
    type: DataTypes.FLOAT,
    defaultValue: 0
  },
  endereco: {
    type: DataTypes.STRING,
    allowNull: false
  },
  telefone: {
    type: DataTypes.STRING(16)
  }
})