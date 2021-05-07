const { getDispatcher, getQueue } = require("../queue.js");

module.exports = {
    name: "skip",
    description: "Skip the current song in the queue",
    execute(message) {
        const dispatcher = getDispatcher();

        if (!dispatcher) {
            return message.channel.send("No songs are currently playing.");
        }

        dispatcher.end();
    },
};
