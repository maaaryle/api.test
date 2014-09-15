var express = require('express');
var router = express.Router();

// this could be "api" or "client"
var gravatarLookup = process.env.GRAVATAR_LOOKUP;


/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express', gravatarLookup: gravatarLookup });
});

module.exports = router;
