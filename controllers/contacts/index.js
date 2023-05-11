const getListContacts = require("./getListContacts");
const getContactId = require("./getContactId");
const addNewContact = require("./addNewContact");
const removeContactById = require("./removeContactById");
const updateContactById = require("./updateContactById");
const updateStatusContact = require("./updateStatusContact");

module.exports = {
  getListContacts,
  getContactId,
  addNewContact,
  removeContactById,
  updateContactById,
  updateStatusContact,
};
