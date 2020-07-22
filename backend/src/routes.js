const { Dev, validateDev } = require("./models/Dev");
const { Router } = require("express");
const axios = require("axios");
const routes = Router();

routes.get("/devs", async (req, res) => {
  const devs = await Dev.find();
  return res.json(devs);
});

routes.post("/devs", async (req, res) => {
  const { error } = validateDev(req.body);
  if (error) return res.status(400).json(error.details[0].message);

  const { github_username, techs } = req.body;

  const response = await axios
    .get(`https://api.github.com/users/${github_username}`)
    .catch((err) => {
      return res.status(400).json({ error: `User not found.` });
    });

  const { name = login, bio, avatar_url } = response.data;

  let dev = await Dev.findOne({
    $or: [{ name: github_username }, { github_username }],
  });

  if (dev) return res.json(dev);

  dev = await Dev.create({
    name,
    github_username,
    bio,
    techs: techs.split(",").map((tech) => tech.trim()),
    avatar_url,
  });

  return res.json(dev);
});

module.exports = routes;
