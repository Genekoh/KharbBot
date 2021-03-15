const Command = require("../structures/command.js");

module.exports = class Disconnect extends Command {
  constructor(message, _) {
    super({ message });
    this.voiceChannel = message.member.voice.channel;
  }

  static get command() {
    return "disconnect";
  }

  run() {
    this.voiceChannel.leave();
  }
};
