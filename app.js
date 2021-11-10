/**
 * node api 설계방법
 * express, cors, helmet, morgan library를 설치한다.
 * router설정을 위해 tweet.js 파일을 분리한 후 경로주소를 설정한다.
 * router는 기본주소뒤에 커스텀된 주소를 추가한다.
 * page Not Found를 잡기위한 404에러 부분을 추가한다.
 * 문법에러를 위한 500에러 부분을 추가한다.
 */

import express from "express";
import cors from "cors";
import tweetsRouter from "./router/tweet.js";
import helmet from "helmet";
import morgan from "morgan";
const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan("tiny"));

app.use("/tweets", tweetsRouter);

app.use((req, res, next) => {
  res.sendStatus(404);
});

app.use((error, req, res, next) => {
  console.error(error);
  res.sendStatus(500);
});
app.listen(8079);
