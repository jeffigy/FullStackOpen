const { Router } = require("express");
const noteRoutes = require("./note.route");

const apiRoutes = Router();

apiRoutes.use("/notes", noteRoutes);

module.exports = apiRoutes;
