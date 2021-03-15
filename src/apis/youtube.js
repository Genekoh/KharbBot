const API_URL = "https://noembed.com/embed?url=";
const axios = require("axios");

module.exports = {
  async getTitle(url) {
    try {
      if (!url.includes("https://")) {
        url += "https://";
      }

      const hi = API_URL + url;
      const VideoInfo = await axios.get(hi);
      return VideoInfo.data.title;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
};
