const errorMsgFormat = () => {
  return {
    status: 0,
    data: { error: "", message: "" },
  };
};

const successMsgFormat = () => {
  return {
    status: 1,
    data: { error: "", message: "" },
  };
};

const errorCode = {
  success: 200,
  error: 400,
  unauthorizeAccess: 401,
};

const preResponse = (msgObj) => {
  //msgObj.data = JSON.stringify(msgObj.data);
  //msgObj.data = msgObj.data;
  return msgObj;
};

module.exports = {
  errorMsgFormat,
  successMsgFormat,
  errorCode,
  preResponse,
};
