import { Router, Request, Response } from "express";
import UserControllerRest from "../controllers/usuarioController";

const router: Router = Router();
var UserController: UserControllerRest;

router.get(`/consulta_usuario`, (req: Request, res: Response) => {
  UserController = new UserControllerRest();
  UserController.getUser(req, res);
});

router.post(`/criar_usuario`, (req: Request, res: Response) => {
  UserController = new UserControllerRest();
  UserController.postUser(req, res);
});

router.put(`/atualizar_usuario`, (req: Request, res: Response) => {
  UserController = new UserControllerRest();
  UserController.putUser(req, res);
});

router.delete(`/excluir_usuario`, (req: Request, res: Response) => {
  UserController = new UserControllerRest();
  UserController.deleteUser(req, res);
});

export default router;