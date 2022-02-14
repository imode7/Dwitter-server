/**
 * 여기서 jwt 토큰을 만들어야 되나? => 아니 controller에서 만든다
 *
 */

let users = [
  {
    id: "1",
    username: "sewon3",
    password: "$2b$10$vv0q3HaWBKWCNLTli66lP.suiYd7OOaDMk5Jk4JcW3uI.9AChgY56",
    name: "김명훈",
    email: "imode7@naver.com",
    url: "http://onair.sisaphone.com/image/login/avatar3.png",
  },
];

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
