const { HttpError } = require("../../helpers");
const { Notices } = require("../../models");
const { ctrlWrapper } = require("../../utils");

const getAllOwnNotices = async (req, res) => {
  const { _id: owner } = req.user;
  const { searchValue, page, limit } = req.query;
  const skip = (page - 1) * limit;

  // console.log(req.user);
  const allNotices = await Notices.find({ owner }, "", {
    skip,
    limit: Number(limit),
  });

  //.populate("owner", "name email _id, phone");
  if (searchValue) {
    const filteredNotices = allNotices.filter((notice) =>
      notice.title.includes(`${searchValue}`)
    );

    if (filteredNotices.length < 1) {
      throw HttpError(404, `Notices with "${searchValue}" title not found`);
    }
    res.json(filteredNotices);
  }

  if (searchValue === "" || !searchValue) {
    res.json(allNotices);
  }
};

module.exports = { getAllOwnNotices: ctrlWrapper(getAllOwnNotices) };
