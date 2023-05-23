const { HttpError } = require("../../helpers");
const { Notices } = require("../../models");
const { ctrlWrapper } = require("../../utils");

const deleteOwnNoticeById = async (req, res) => {
  const { id } = req.params;
  const { _id } = req.user;
  const deletedNotices = await Notices.findOneAndDelete({
    _id: id,
    owner: _id,
  });
  if (deletedNotices) {
    return res.json({
      id: `${id}`,
      message: `Notice with id ${id} successfully delete`,
    });
  } else {
    throw HttpError(404, `Notices with ${id} not found`);
  }
};

module.exports = { deleteOwnNoticeById: ctrlWrapper(deleteOwnNoticeById) };
