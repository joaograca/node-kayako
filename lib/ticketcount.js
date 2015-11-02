var utils = require('./utils');
var querystring = require('querystring');
var crypto = require('crypto');
var _ = require('underscore');

var ticketcount = function (client, xml) {
	this.client = client;
	if (xml) {
		utils.parse_xml(this, xml.department, true);
	}
};


ticketcount.prototype.get = function (callback) {
	this.client.get_item('/Tickets/TicketCount/', ticketcount, callback);
};


module.exports = ticketcount;
