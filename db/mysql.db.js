const mysql = require("mysql");
const config = require("../config/config");

const query = async (sql, values) => {
  let pool = await mysql.createConnection(config.sqlConfig);

  await pool.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
  });

  return new Promise((resolve) => {
    pool.query(sql, values, function (err, results, fields) {
      if (err) throw err;

      pool.end();
      resolve(results);
    });
  });
};

const char_escape = (text) => {
  return typeof text === "string" ? text.replace("/'/g", "'") : text;
};

module.exports = { query, char_escape };
