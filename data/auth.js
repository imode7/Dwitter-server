/**
 * 여기서 jwt 토큰을 만들어야 되나?
 *
 */
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const secret = "hoonhee";

let authDBs = [
  {
    id: "1",
    username: "imode7",
    password: "12345",
    name: "김명훈",
    email: "imode7@naver.com",
    url: "http://onair.sisaphone.com/image/login/avatar3.png",
  },
];

// 회원가입
export async function signup(username, password, name, email, url) {
  password = bcrypt.hashSync(password, 10);

  const authDB = {
    id: Date.now().toString(),
    username,
    password,
    name,
    email,
    url,
  };
  authDBs = [authDB, ...authDBs];

  const token = jwt.sign(
    {
      access: true,
      username,
    },
    secret,
    {
      expiresIn: 120,
    }
  );

  //token and username return
  return { token, username };
}

// 로그인
export async function login(username, password) {
  const loginUser = authDBs.filter(
    (param) => param.username === username && param.password === password
  );

  if (loginUser.length > 0) {
    const loginUserName = loginUser[0].username;

    const token = jwt.sign(
      {
        access: true,
        username,
      },
      secret,
      {
        expiresIn: 120,
      }
    );
    return { token, loginUserName };
  } else {
    return null;
  }
}

// 자기자신 로그인
export async function me() {
  return "";
}
