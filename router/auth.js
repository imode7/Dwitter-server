/**
 * express를 삽입한다( import {express} ... 이라고 삽입하면 에러발생함으로 주의할것)
 * router를 생성한다. ex) const router = express.Router();
 * signup, login, me api를 생성한다.
 *  우선적으로 각각의 api를 주석처리하여 제목을 잡아놓고 하나씩 만든다.
 * 해당 api들을 만든 후 postman으로 테스트한다. (전체를 postman으로 테스트 가능 => 컬렉션 누른후 Run 누름)
 */

import express from "express";
import * as authController from "../controller/auth.js";

const router = express.Router();

// POST // signup
router.post("/signup", authController.signup);

// POST // login
router.post("/login", authController.login);

// GET // me
router.get("/me", authController.me);

export default router;
