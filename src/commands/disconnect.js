const Command = require("../structures/command.js");

module.exports = class Disconnect extends Command {
  constructor(message, _) {
    super({ message });
    this.textChannel = this.message.channel;
    this.voiceChannel = this.message.member.voice.channel;
  }

  static get command() {
    return "disconnect";
  }

  static get aliases() {
    return ["dc"];
  }

  run() {
    if (!this.voiceChannel) {
      return this.textChannel.send(
        "You have to be in a voice channel to disconnect the bot"
      );
    } else if (!this.voiceChannel.members.get(process.env.DISCORD_ID)) {
      return this.textChannel.send(
        "The bot is not in the voice channel you are in"
      );
    }

    this.voiceChannel.leave();
  }
};
