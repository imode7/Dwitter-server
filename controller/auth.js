import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {} from "express-async-errors";
import * as auth from "../middleware/auth.js";
import * as userRepository from "../data/auth.js";

// TODO: Make it secure!
const jwtSecretKey = "hoonhee";
const jwtExpiresInDays = "2d";
const bcryptSaltRounds = 10;

function createJwtToken(id) {
  return jwt.sign({ id }, jwtSecretKey, { expiresIn: jwtExpiresInDays });
}

export async function signup(req, res, next) {
  /**
   * 1. username, password, name, email, url을 바디에서 받는다
   * 2. findByUsername함수를 실행하여 username이 있으면 found true로 반환
   * 3. found가 true면 에러코드 반환 아니면 회원가입 진행
   * 4. bcrypt.hash로 비밀번호를 암호화한다(bcryptSaltRounds의 길이만큼)
   * 5. signup에 모든 것들을 매개변수로 담아 던진다.
   */
  const { username, password, name, email, url } = req.body;
  const found = await userRepository.findByUsername(username);
  if (found) {
    return res.status(409).json({ message: `${username} already exists` });
  }

  const hashed = await bcrypt.hash(password, bcryptSaltRounds);

  const userId = await userRepository.createUser({
    username,
    password: hashed,
    name,
    email,
    url,
  });
  const token = createJwtToken(userId);
  res.status(201).json({ token, username });
}

export async function login(req, res, next) {
  const { username, password } = req.body;
  const user = await userRepository.findByUsername(username);
  if (!user) {
    return res.status(401).json({ message: "Invalid user or password" });
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return res.status(401).json({ message: "Invalid user or password" });
  }
  const token = createJwtToken(user.id);
  res.status(200).json({ token, username });
}

export async function me(req, res, next) {
  const user = await userRepository.findById(req.userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json({ token: req.token, username: user.username });
}
