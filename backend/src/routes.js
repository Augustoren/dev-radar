const { Router } = require("express");
const routes = Router();

const DevController = require("./controllers/DevController");
const SearchController = require("./controllers/SearchController");

// Dev routes
routes.get("/devs", DevController.index);
routes.post("/devs", DevController.store);

//Search routes
routes.get("/search", SearchController.index);

module.exports = routes;
