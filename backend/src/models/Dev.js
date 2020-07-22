const mongoose = require("mongoose");
const joi = require("joi");

const DevSchema = new mongoose.Schema({
  name: String,
  github_username: String,
  bio: String,
  avatar_url: String,
  techs: [String],
});

const Dev = mongoose.model("Dev", DevSchema);

function validateDev(dev) {
  const schema = joi.object({
    github_username: joi.string().required(),
    techs: joi.string().required(),
  });
  return schema.validate(dev);
}

module.exports = {
  Dev,
  validateDev,
};
