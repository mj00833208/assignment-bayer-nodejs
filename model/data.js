const messageHelper = require("../helper/message");
const db = require("../db/mysql.db");

const importData = async (req) => {
  console.log("------- importData -------------");

  let error = [];
  let response = messageHelper.successMsgFormat();

  try {
    let sql = `INSERT INTO data (sheet_id, Metadata_Col, Metadata_Row, Metadata_Well, Metadata_perturbation_id, Metadata_perturbation_type, QC_cell_count, QC_cell_count_cov, QC_cov_failed, QC_position_effect) VALUES ? `;

    await db.query(sql, [req]);

    response["data"]["message"] = "Data imported successfully.";
    return response;
  } catch (err) {
    response = messageHelper.errorMsgFormat();
    error.push(err.message);
    response["data"]["error"] = error;
    return response;
  }
};

const fetchData = async () => {
  console.log("------- fetchData -------------");

  let error = [];
  let response = messageHelper.successMsgFormat();

  try {
    let sql = `SELECT Metadata_Row, Metadata_Col, QC_position_effect FROM data WHERE QC_cell_count = ?`;

    let results = await db.query(sql, [1536]);

    response["data"]["data"] = results;
    response["data"]["message"] = "success";
    return response;
  } catch (err) {
    response = messageHelper.errorMsgFormat();
    error.push(err.message);
    response["data"]["error"] = error;
    return response;
  }
};

module.exports = { importData, fetchData };
