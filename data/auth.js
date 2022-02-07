/**
 * 여기서 jwt 토큰을 만들어야 되나? => 아니 controller에서 만든다
 *
 */
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const secret = "hoonhee";

let users = [
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
// 내가 만들었던 소스 => controller로 대량 이동
/* export async function signup(username, password, name, email, url) {
  password = bcrypt.hashSync(password, 10);

  const authDB = {
    id: Date.now().toString(),
    username,
    password,
    name,
    email,
    url,
  };
  users = [authDB, ...users];

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
} */

// 로그인
export async function login(username, password) {
  const loginUser = users.filter((param) => {
    return (
      param.username === username &&
      bcrypt.compareSync(password, param.password) === true
    );
  });

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

// 회원가입시 동일한 username이 있는지 확인
export async function findByUsername(username) {
  return users.find((param) => param.username === username);
}

export async function findById(id) {
  return users.find((param) => param.id === id);
}

// 자기자신 로그인
export async function me() {
  return "";
}

export async function createUser(user) {
  const created = { ...user, id: Date.now().toString() };
  users.push(created);
  return created.id;
}
