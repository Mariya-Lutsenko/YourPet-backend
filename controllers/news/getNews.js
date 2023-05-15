const { News } = require("../../models");

const getNews = async (req, res) => {
  const { page = 1, limit = 6, search = "" } = req.query;
  const skip = (page - 1) * limit;
  let totalPages = 1;
  if (search === "") {
    const allnews = await News.find({});
    const news = await News.find({}).sort({ date: -1 }).skip(skip).limit(limit);
    totalPages = allnews.length === 0 ? 1 : Math.ceil(allnews.length / limit);
    res.status(200).json({ news, totalPages });
  } else {
    const allSearchNews = await News.find({ $text: { $search: search } });
    const news = await News.find({ $text: { $search: search } }).skip(skip);
    totalPages =
      allSearchNews.length === 0 ? 1 : Math.ceil(allSearchNews.length / limit);
    res.status(200).json({ news, totalPages });
  }
};
module.exports = getNews;
