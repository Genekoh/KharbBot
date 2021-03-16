const Config = require("../config.js");
const Command = require("../structures/command.js");

module.exports = class Prefix extends Command {
  constructor(message, parameters) {
    super({ message, parameters });
    this.textChannel = this.message.channel;
    this.newPrefix = Array.isArray(parameters) ? parameters[0] : parameters;
  }

  static get command() {
    return "prefix";
  }

  run() {
    if (!this.newPrefix) {
      return this.textChannel.send("Not a valid prefix");
    } else if (this.newPrefix === Config.prefix) {
      console.log(this.newPrefix);
      console.log(Config.prefix);
      return this.textChannel.send("Already using this prefix");
    }

    Config.prefix = this.newPrefix;
    console.log(Config.prefix);
  }
};
