const Util = require("../utils");

module.exports = class Command {
  constructor(options) {
    const optionHandler = Util.createOptionHandler("Command", options);
    this.message = optionHandler.required("message");
    this.parameters = optionHandler.optional("parameters");
  }

  run() {}

  static get getCommandName() {}
};
