const getCurrent = async (req, res) => {
  const { _id, name, email, phone, birthday, city, avatarURL } = req.user;
  res.status(200).json({
    _id,
    email,
    name,
    phone,
    birthday,
    city,
    avatarURL,
  });
};

module.exports = getCurrent;
