/**
 * express를 삽입한다( import {express} ... 이라고 삽입하면 에러발생함으로 주의할것)
 * router를 생성한다. ex) const router = express.Router();
 * get, create(post), update(put), delete할 api를 생성한다.
 *  우선적으로 각각의 api를 주석처리하여 제목을 잡아놓고 하나씩 만든다.
 * 해당 api들을 만든 후 postman으로 테스트한다. (전체를 postman으로 테스트 가능 => 컬렉션 누른후 Run 누름)
 */

/**
 * 헷갈리는 부분
 * 1. export default router로 내보내면 다른곳에서 import할때는 export default로 설정한
 * 변수(router)로 들어오고 그 변수가 가리키는 함수를 실행시키는 것인가? => 현재 이렇게 이해함
 * 2. := 이 기호는 단순히 같다를 의미하는가?
 */

import express from "express";
import * as tweetController from "../controller/tweet.js";

const router = express.Router();

// GET // tweets
// GET // tweets?username:=username
router.get("/", tweetController.getTweets);

// GET // tweets/:id
router.get("/:id", tweetController.getTweet);

// POST // tweets
router.post("/", tweetController.createTweet);

// PUT // tweets/:id
router.put("/:id", tweetController.updateTweet);

// DELETE // tweets/:id
router.delete("/:id", tweetController.deleteTweet);

export default router;
