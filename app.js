import express from "express";
import cors from "cors";
const app = express();

// initialize tweet
let tweets = [
  {
    id: 1,
    text: "First tweet in Server",
    createdAt: new Date().toISOString(),
    name: "Bob",
    username: "bob",
    url: "http://onair.sisaphone.com/image/login/avatar3.png",
  },
];

app.use(cors());
app.use(express.json());

app.get("/tweets", (req, res) => {
  res.status(200).send({ tweets });
});

app.post("/tweets", (req, res) => {
  const params = req.body.params;
  const param = {
    id: params.id,
    text: params.text,
    createdAt: params.createdAt,
    name: params.name,
    username: params.username,
  };
  tweets.push(param);
  res.status(201).send({ tweets });
});

app.delete("/tweets/:id", (req, res) => {
  tweets = tweets.filter((tweet) => tweet.id !== Number(req.params.id));
  res.status(201).send({ tweets });
});

app.put("/tweets/:id&:text", (req, res) => {
  const tweet = tweets.find((tweet) => tweet.id === Number(req.params.id));
  if (!tweet) {
    res.status(500).send("tweet doesn't match");
  } else {
    tweet.text = req.params.text;
    res.status(201).send({ tweets });
  }
});

app.listen(8079);
