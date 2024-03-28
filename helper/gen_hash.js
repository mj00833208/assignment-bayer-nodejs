const crypto = require("crypto");

const my_ksort = (paramaters) => {
  let keys = Object.keys(paramaters);
  let keyssorted = keys.sort();
  let resdata = [];
  for (let k in keyssorted) {
    resdata[keyssorted[k]] = paramaters[keyssorted[k]];
  }

  return resdata;
};

const getHash = (paramaters, secretKey=process.env.SEAMLESS_SECRET) => {
  if (paramaters.hash) delete paramaters.hash;
  let params = my_ksort(paramaters);
  let out = [];
  let i = 0;
  console.log(params);
  for (let k in params) {
    ++i;
    // if(Object.keys(params).length == i){
    //     out[k] = k + "=" + params[k] + secretKey;
    // }else{
    //     out[k] = k + "=" + params[k];
    // }
    console.log(params[k]);
    let keys = Object.keys(params);
    let nextIndex = keys.indexOf(k) + 1;
    let nextItem = keys[nextIndex];
    console.log(nextItem);
    if (Object.keys(params).length == i) {
      out[k] = k + "=" + params[k] + secretKey;
    } else if (!params[nextItem]) {
      out[k] = k + "=" + params[k] + secretKey;
    } else {
      out[k] = k + "=" + params[k];
    }
  }

  let outstr = Object.values(out).join("&");
  console.log(outstr);
  let hash = crypto
    .createHmac("sha256", secretKey)
    .update(outstr)
    .digest("hex");
  console.log(hash);
  return hash;
};

const getTimestampInSeconds = () => {
  return Math.floor(Date.now() / 1000);
};

module.exports = {
  getHash,
  getTimestampInSeconds,
};
