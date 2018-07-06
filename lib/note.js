var utils = require('./utils');
var querystring = require('querystring');
var crypto = require('crypto');
var _ = require('underscore');

var note = function(client, xml) {
  this.client = client;
  if (xml) {
    utils.parse_xml(this, xml);
  }
};

note.prototype.post = function(optionsp, callback) {
  var client = this.client;
  var salt = crypto.randomBytes(20).toString('base64');

  var options = {
    e: '/Tickets/TicketNote',
    apikey: this.client.get_apikey(),
    salt: salt,
    signature: this.client.generate_signature(salt)
  };

  _.extend(options, optionsp);

  console.log(options);

  var postdata = querystring.stringify(options);

  console.log(postdata);

  var opts = {
    path: '/api/index.php',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': postdata.length
    }
  };

  this.client.request(opts, postdata, function(err, res) {
    if (err) {
      callback(err);
    } else {
      client.parse_items(res.data, client, note, callback);
    }
  });
};

module.exports = note;
