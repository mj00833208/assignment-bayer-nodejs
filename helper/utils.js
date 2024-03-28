const CryptoJS = require("crypto-js");

const base64_encode = (data) => {
  let buff = new Buffer.from(data);
  return buff.toString("base64");
};

const base64_decode = (data) => {
  let buff = new Buffer.from(data, "base64");
  return buff.toString("ascii");
};

const encrypt = (data, key = "$%#@!()*&^$FRcdew+1&5!&9Ly") => {
  let key1 = CryptoJS.MD5(CryptoJS.enc.Utf8.parse(key));
  let iv = { ...key1 };
  iv.sigBytes = 8;
  let mode = CryptoJS.mode.ECB;
  let padding = CryptoJS.pad.Pkcs7;
  let encrypted = CryptoJS.TripleDES.encrypt(data, key1, {
    iv,
    mode,
    padding,
  }).toString();

  console.log("DATO ENC:" + encrypted);

  return encrypted;
};

module.exports = {
  base64_encode,
  base64_decode,
  encrypt,
};
