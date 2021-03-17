var utils = require('./utils');

var notes = function (client, xml) {
  this.client = client;
  if (xml) {
    utils.parse_xml(this, xml);
  }
};

notes.prototype.get = function (ticketid, callback) {
  this.client.get_items('/Tickets/TicketNote/ListAll/' + ticketid, require('./note'), callback);
};

module.exports = notes;