//test
let tweets = [
  {
    id: "1",
    text: "드림코더분들 화이팅!",
    createdAt: new Date().toISOString(),
    name: "Bob",
    username: "bob",
    url: "http://onair.sisaphone.com/image/login/avatar3.png",
  },
  {
    id: "2",
    text: "안뇽!",
    createdAt: new Date().toISOString(),
    name: "Ellie",
    username: "ellie",
  },
];

// 모든 트윗 조회
export async function getAll() {
  return tweets;
}

// 이름별 트윗 조회
export async function getUserName(username) {
  return tweets.filter((tweet) => username === tweet.username);
}

// id별 트윗 조회
export async function getId(id) {
  return tweets.filter((tweet) => id === tweet.id);
}

// 트윗 추가
export async function create(text, username, name) {
  const tweet = {
    id: Date.now().toString(),
    text,
    createdAt: new Date().toISOString(),
    name,
    username,
  };
  tweets = [tweet, ...tweets];
  return tweet;
}

// 트윗 수정
export async function update(id, text) {
  return tweets.find((tweet) => id === tweet.id);
}

// 트윗 삭제
export async function remove(id) {
  tweets = tweets.filter((tweet) => tweet.id !== id);
  return tweets;
}
