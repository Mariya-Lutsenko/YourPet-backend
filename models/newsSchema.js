const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../utils");

const newsSchema = new Schema(
  {
    imgUrl: {
      type: String,
      default: false,
    },
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

newsSchema.post("save", handleMongooseError);
const News = model("news", newsSchema);
module.exports = { News };
