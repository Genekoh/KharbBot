const { getDispatcher } = require("../states.js");

module.exports = {
    names: ["skip", "s"],
    description: "Skip the current song in the queue",
    execute(message) {
        const dispatcher = getDispatcher();

        if (!dispatcher) {
            return message.channel.send("No songs are currently playing.");
        }

        dispatcher.end();
    },
};
