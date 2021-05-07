const { getQueue } = require("../queue.js");

module.exports = {
    name: "queue",
    description: "See the queue of songs",
    execute(message) {
        const queue = getQueue();

        if (!queue || queue.length === 0) {
            return message.channel.send("No songs in queue");
        }

        let text = "";
        queue.forEach((q, i) => {
            text += `${i + 1}) ${q.title}\n`;
        });

        message.channel.send(`\`\`${text}\`\``);
    },
};
