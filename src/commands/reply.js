module.exports = {
  name: "reply",
  description: "Reply with the argument given",
  errorMessage: {
    noArgs: "You need enter atleast a word",
  },
  run(message, args) {
    if (args.length === 0) {
      message.channel.send(this.errorMessage.noWords);
    }
    args.forEach((reply) => {
      message.channel.send(reply);
    });
  },
};
