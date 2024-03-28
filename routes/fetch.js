const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const dataService = require("../service/data");
const messageHelper = require("../helper/message");

/**
 * @swagger
 * /api/v1/fetch:
 *   post:
 *      summary: Data Fetch
 *      tags:
 *          - Fetch Data
 *      description: Select data from database
 *      responses:
 *          '200':
 *              description: Successful
 *              content:
 *                      'application/json':
 *                           schema:
 *                               type: array
 *                               description: response
 */
router.post("/", urlencodedParser, async (req, res, next) => {
  let error = [];
  let response = messageHelper.errorMsgFormat();
  try {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      error = errors.array();
    }

    if (error.length > 0) {
      response["data"]["message"] = error[0];
      res
        .status(messageHelper.errorCode.error)
        .json(messageHelper.preResponse(response));
    } else {
      response = await dataService.fetchData(req);
      res
        .status(messageHelper.errorCode.success)
        .json(messageHelper.preResponse(response));
    }
  } catch (e) {
    response["data"]["error"] = e.message;
    res
      .status(messageHelper.errorCode.error)
      .json(messageHelper.preResponse(response));
  }
});

module.exports = router;
