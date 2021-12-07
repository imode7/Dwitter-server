import * as authRepository from "../data/auth.js";

export async function signup(req, res, next) {
  const { username, password, name, email, url } = req.body;
  const signup = await authRepository.signup(
    username,
    password,
    name,
    email,
    url
  );
  res.status(201).json(signup);
}

export async function login(req, res, next) {
  const { username, password } = req.body;
  const login = await authRepository.login(username, password);
  if (login) {
    res.status(200).json(login);
  } else {
    res.status(500).json({ message: `User id(${username}) not found` });
  }
}

export async function me(req, res, next) {
  const { token, username } = req.body;
}
