const Command = require("../structures/command.js");
const Youtube = require("../apis/youtube.js");
const ytdl = require("ytdl-core");

module.exports = class Play extends Command {
  constructor(message, parameters) {
    super({ message, parameters });

    let url = Array.isArray(this.parameters)
      ? this.parameters[0]
      : this.parameters;
    if (typeof url === "string" && !url.includes("https://")) {
      url += "https://";
    }
    this.url = url;
    this.voiceChannel = this.message.member.voice.channel;
  }

  static get command() {
    return "play";
  }

  async run() {
    try {
      if (!this.voiceChannel) {
        return this.message.channel.send(
          "You have to be in a channel before running this command"
        );
      }

      const videoTitle = await Youtube.getTitle(this.url);
      this.connection = await this.voiceChannel.join();
      const dispatcher = this.connection.play(ytdl(this.url));

      dispatcher.on("start", () => {
        this.message.channel.send(`Playing ${videoTitle}`);
      });

      dispatcher.on("end", () => {
        this.message.channel.send(`${videoTitle} ended`);
      });
    } catch (err) {
      console.log(err);
    }
  }
};
