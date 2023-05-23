const { News } = require("../../models");

const getNews = async (req, res) => {
  const { page = 1, limit = 6, search = "" } = req.query;
  const skip = (page - 1) * limit;

  const matchQuery = search !== "" ? { $text: { $search: search } } : {};

  const countQuery = [
    { $match: matchQuery },
    { $group: { _id: null, count: { $sum: 1 } } },
  ];

  const newsQuery = [
    { $match: matchQuery },
    { $sort: { date: -1 } },
    { $skip: skip },
    { $limit: Number(limit) },
  ];

  const [totalCount, news] = await Promise.all([
    News.aggregate(countQuery),
    News.aggregate(newsQuery),
  ]);

  const totalDocuments = totalCount.length > 0 ? totalCount[0].count : 0;
  const totalPages =
    totalDocuments === 0 ? 1 : Math.ceil(totalDocuments / limit);

  res.status(200).json({ news, totalPages, page });
};

module.exports = getNews;
