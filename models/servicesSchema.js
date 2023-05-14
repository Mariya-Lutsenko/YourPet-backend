const { Schema, model } = require("mongoose");

const { handleMongooseError } = require("../utils");

const servicesSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Set title for new"],
    },
    url: {
      type: String,
    },
    addressUrl: { type: String },
    imageUrl: {
      type: String,
      default: false,
    },
    address: {
      type: String,
      default: null,
    },
    workDays: {
      type: Array,
      default: null,
    },
    phone: {
      type: String,
      default: null,
    },
    email: { type: String },
  },
  {
    versionKey: false,
  }
);

servicesSchema.post("save", handleMongooseError);

const Services = model("services", servicesSchema);
module.exports = { Services };
