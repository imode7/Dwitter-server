import * as tweetRepository from "../data/tweet.js";

export async function getTweets(req, res, next) {
  const username = req.query.username;
  const data = await (username
    ? tweetRepository.getUserName(username)
    : tweetRepository.getAll());
  res.status(201).json(data);
}

export async function getTweet(req, res, next) {
  const id = req.params.id;
  const data = id ? await tweetRepository.getId(id) : "";
  res.status(200).json(data);
}

export async function createTweet(req, res, next) {
  const { text, username, name } = req.body;
  const tweet = await tweetRepository.create(text, username, name);
  res.status(201).json(tweet);
}

export async function updateTweet(req, res, next) {
  const id = req.params.id;
  const text = req.body.text;
  const tweet = await tweetRepository.update(id, text);
  if (tweet) {
    tweet.text = text;
    res.status(200).json(tweet);
  } else {
    res.status(404).json({ message: `Tweet id(${id}) not found` });
  }
}

export async function deleteTweet(req, res, next) {
  const id = req.params.id;
  await tweetRepository.remove(id);
  res.sendStatus(201);
}
