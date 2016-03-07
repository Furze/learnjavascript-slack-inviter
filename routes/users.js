var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/', function(req, res, next) {
  if(req.body.hasOwnProperty('email')){
    var SlackClient = require('slack-api-client');
    var slack = new SlackClient(process.env.SLACK_TOKEN);
    slack.api.chat.postMessage({
      'channel': 'registrations',
      'text': 'Inviting ' + req.body.email
    });
    slack.api.users.invite({
      email: req.body.email,
      set_active: 'true'
    }, function (err, resTwo) {
      if (err) {
        res.render('error', {
          message: err.message,
          error: {}
        });
      }
      res.redirect('learnjs.azurewebsites.net');
    });
  } else {
    res.redirect('learnjs.azurewebsites.net')
  }
});

module.exports = router;
