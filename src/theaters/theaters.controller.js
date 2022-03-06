const theatersService = require("./theaters.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

// list all theaters
const list = async (req, res) => {
  const data = await theatersService.list();
  res.json({ data });
};

module.exports = {
  list: asyncErrorBoundary(list),
};