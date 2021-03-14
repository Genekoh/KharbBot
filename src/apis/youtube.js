const API_URL = "https://noembed.com/embed?url=";
const axios = require("axios");

module.exports = {
  async getTitle(url) {
    try {
      if (!url.includes("https://")) {
        url += "https://";
      }

      const VideoInfo = await axios.get(API_URL + url);
      return VideoInfo.title;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
};
