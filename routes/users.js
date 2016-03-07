var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/', function(req, res, next) {
  if(req.body.hasOwnProperty('email')){
    var SlackClient = require('slack-api-client');
    var slack = new SlackClient(process.env.SLACK_TOKEN);
    slack.chat.postMessage({
      'channel': 'registrations',
      'message': 'Inviting ' + req.body.email
    });
    slack.api.users.invite({
      email: req.body.email,
      set_active: 'true'
    }, function (err, resTwo) {
      if (err) { res.send(err); }
      res.render(index);
    });
  } else {
    res.statusCode(400).send('respond with a resource');
  }
});

module.exports = router;
