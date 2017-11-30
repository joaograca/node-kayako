var utils = require('./utils');
var querystring = require('querystring');
var crypto = require('crypto');

var ticketpost = function (client, xml) {
	this.client = client;
	if (xml) {
		utils.parse_xml(this, xml);
	}
};
ticketpost.prototype.post = function (optionsp, callback) {
	var client = this.client;
	var salt = crypto.randomBytes(20).toString('base64');
	var options = {
		e: '/Tickets/TicketPost',
		apikey: this.client.get_apikey(),
		salt: salt,
		signature: this.client.generate_signature(salt)
	};

	options.ticketid = optionsp.ticketid;
	options.contents = optionsp.contents;
	options.userid = optionsp.userid;
	options.staffid = optionsp.staffid;

	var postdata = querystring.stringify(options);

	var opts = {
		path: '/api/index.php',
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Content-Length': postdata.length
		}
	};

	this.client.request(opts, postdata, function (err, res) {
		if (err) {
			callback(err);
		} else {
			client.parse_items(res.data, client, ticketpost, callback);
		}
	});
};

module.exports = ticketpost;
