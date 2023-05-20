const { HttpError } = require("../../helpers");
const { Notices } = require("../../models");
const { ctrlWrapper } = require("../../utils");

const deleteOwnNoticesById = async (req, res) => {
  const { id } = req.params; // id notice
  const { _id } = req.user; // id user
  const deletedNotices = await Notices.findById(id);
  if (deletedNotices) {
    if (_id.equals(deletedNotices.owner)) {
      const result = await Notices.findByIdAndRemove(id);
      if (!result) {
        throw HttpError(404, `Notices with ${id} not found`);
      }
      return res.json({
        id: `${id}`,
        message: `Notice with id ${id} successfully delete`,
      });
    }

    throw HttpError(403, "Forbidden. This notis has other user");
  }
  throw HttpError(404, `Notices with ${id} not found`);
};

module.exports = { deleteOwnNoticesById: ctrlWrapper(deleteOwnNoticesById) };
