import express from "express";
import bodyparser from "body-parser";
import { server } from "./config/app";
import userRouter from "./routers/usuarioRouter";
import { connectDB } from "./database/db"

const app = express();

app.use(bodyparser.json());
app.use(userRouter);

app.listen(server.port, async () => {
  await connectDB.sync();

  console.log('rodando na porta: ' + server.port + ' - ' + new Date());
});
