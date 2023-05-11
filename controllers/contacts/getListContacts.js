const { Contact } = require("../../models");
const { HttpError } = require("../../helpers");

const getListContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * limit;
  try {
    if (favorite) {
      const result = await Contact.find(
        { owner, favorite },
        "-createdAt -updatedAt",
        {
          skip,
          limit,
        }
      ).populate("owner", "email");
      res.json(result);
    }
    const result = await Contact.find({ owner }, "-createdAt -updatedAt", {
      skip,
      limit,
    }).populate("owner", "email");
    res.json(result);
  } catch (error) {
    throw HttpError(404, `Not found`);
  }
};

module.exports = getListContacts;
