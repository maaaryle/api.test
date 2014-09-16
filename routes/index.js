var express = require('express');
var router = express.Router();

// this could be "api" or "client"
var gravatarLookup = process.env.GRAVATAR_LOOKUP;


/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express', gravatarLookup: gravatarLookup });
});

router.get('/twitter', function(req, res) {
  res.render('twitter');
});

var Twit = require('twit');

var T = new Twit({
  consumer_key: process.env.CONSUMER_KEY
  , consumer_secret: process.env.CONSUMER_SECRET
  , access_token: process.env.ACCESS_TOKEN
  , access_token_secret: process.env.ACCESS_TOKEN_SECRET
});


router.post('/twitter', function(req, res) {
  // req.body.tweet
  T.post('statuses/update', { status: req.body.tweet }, function(err, data, response) {
    console.log(data);
  });
  res.redirect("/twitter");
});

router.post('/twitter-search', function(req, res) {
  T.get('search/tweets', { q: req.body.query, count: 100 }, function(err, data, response) {
    res.json(data)
  })
});

module.exports = router;
