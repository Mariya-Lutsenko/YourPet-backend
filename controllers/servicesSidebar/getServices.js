// const { HttpError } = require("../../helpers");
const { ctrlWrapper } = require("../../utils");
const { Services } = require("../../models");

const getServices = async (req, res) => {
  const services = await Services.find();
  res.json(services);
};

module.exports = {
  getServices: ctrlWrapper(getServices),
};
