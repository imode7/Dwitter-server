/**
 * express를 삽입한다( import {express} ... 이라고 삽입하면 에러발생함으로 주의할것)
 * router를 생성한다. ex) const router = express.Router();
 * signup, login, me api를 생성한다.
 *  우선적으로 각각의 api를 주석처리하여 제목을 잡아놓고 하나씩 만든다.
 * 해당 api들을 만든 후 postman으로 테스트한다. (전체를 postman으로 테스트 가능 => 컬렉션 누른후 Run 누름)
 */

import express from "express";
import { body } from "express-validator";
import * as authController from "../controller/auth.js";
import { validate } from "../middleware/validate.js";
import { isAuth } from "../middleware/auth.js";

/**
 * signup에 대한 검사
 * login에 대한 검사
 */

const validatecredential = [
  body(["username"])
    .trim()
    .notEmpty()
    .withMessage("username should be at least 5 characters"),
  body(["password"])
    .trim()
    .isLength({ min: 5 })
    .withMessage("password should be at least 5 characters"),
];

const validateSignup = [
  ...validatecredential,
  body("name").notEmpty().withMessage("name is missing"),
  body("email").isEmail().normalizeEmail().withMessage("invalid email"),
  body("url")
    .isURL()
    .withMessage("invalid URL")
    .optional({ nullable: true, checkFalsy: true }),
  validate,
];

const router = express.Router();

// POST // signup
router.post("/signup", validateSignup, authController.signup);

// POST // login
router.post("/login", validatecredential, authController.login);

// GET // me
router.get("/me", isAuth, authController.me);

export default router;
