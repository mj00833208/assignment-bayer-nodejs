const sanaitize = require("./sanetize");

const main = (req, res, next) => {
  sanaitize(req, res, next);
};

module.exports = main;
