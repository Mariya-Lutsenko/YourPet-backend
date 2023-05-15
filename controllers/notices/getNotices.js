const { HttpError } = require("../../helpers");
const { Notices } = require("../../models");
const { ctrlWrapper } = require("../../utils");

const getNotices = async (req, res) => {
  const { category, searchValue, page, limit } = req.query;
  const skip = (page - 1) * limit;

  const allNotices = await Notices.find({ category: category }, "", {
    skip,
    limit: Number(limit),
  });
  if (!allNotices || allNotices.length < 1) {
    throw HttpError(404, `Category ${category}  not found`);
  }

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

module.exports = { getNotices: ctrlWrapper(getNotices) };
