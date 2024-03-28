const fs = require("fs");
const csv = require("csv-parser");
const dataModel = require("../model/data");

const importData = async (req) => {
  const results = [];
  return new Promise((resolve) => {
    fs.createReadStream(req.files.file.tempFilePath, "utf8")
      .pipe(csv())
      .on("data", (data) => {
        let dataArray = [
          data[""],
          data["Metadata_Col"],
          data["Metadata_Row"],
          data["Metadata_Well"],
          data["Metadata_perturbation_id"],
          data["Metadata_perturbation_type"],
          data["QC_cell_count"],
          data["QC_cell_count_cov"],
          data["QC_cov_failed"],
          data["QC_position_effect"],
        ];

        results.push(dataArray);
      })
      .on("end", async () => {
        resolve(dataModel.importData(results));
      });
  });
};

const fetchData = async (req) => {
  return new Promise((resolve) => {
    resolve(dataModel.fetchData());
  });
};

module.exports = { importData, fetchData };
