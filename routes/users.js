var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/', function(req, res, next) {
  if(req.body.hasOwnProperty('email')){
    var SlackClient = require('slack-api-client');
    var slack = new SlackClient(process.env.SLACK_TOKEN);
    slack.api.users.invite({
      email: req.body.email,
      set_active: 'true'
    }, function (err, resTwo) {
      if (err) { throw err; }
      res.send(resTwo);
    });
  } else {
    res.statusCode(400).send('respond with a resource');
  }
});

module.exports = router;
