const axios = require("axios");
const axioshttps = require("axios-https-proxy-fix");

const axiosProxyRequest = (proxyIp, url) => {
  console.log(proxyIp, url);
  return axios.get(url, {
    proxy: {
      host: proxyIp.split(":")[0],
      port: proxyIp.split(":")[1]
    }
  });
};

const axiosProxyRequest1 = url => {
  return axioshttps.get(url, {
    proxy: {
      host: "open.proxymesh.com",
      port: 31280,
      auth: {
        username: "tealeaf",
        password: "eTjiELVQeA8HNPXBweWGdpdD"
      }
    }
  });
};

module.exports = { axiosProxyRequest, axiosProxyRequest1 };
