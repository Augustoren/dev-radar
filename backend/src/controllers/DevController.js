const { Dev, validateDev } = require("../models/Dev");
const axios = require("axios");
const parseStringAsArray = require("../utils/parseStringAsArray");

module.exports = {
  async index(req, res) {
    const devs = await Dev.find();
    return res.json(devs);
  },

  async store(req, res) {
    const { error } = validateDev(req.body);
    if (error) return res.status(400).json(error.details[0].message);

    const { github_username, techs, latitude, longitude } = req.body;

    let dev = await Dev.findOne({
      $or: [{ name: github_username }, { github_username }],
    });

    if (dev) return res.json(dev);

    const response = await axios
      .get(`https://api.github.com/users/${github_username}`)
      .catch((err) => {
        return res.status(400).json({ error: `User not found.` });
      });

    const { name = login, bio, avatar_url } = response.data;

    const location = {
      type: "Point",
      coordinates: [longitude, latitude],
    };

    dev = await Dev.create({
      name,
      github_username,
      bio,
      techs: parseStringAsArray(techs),
      avatar_url,
      location,
    });

    return res.json(dev);
  },
};
