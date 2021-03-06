const { getQueue, setQueue } = require("../states.js");

module.exports = {
    names: ["remove"],
    description: "Remove a song in the queue",
    execute(message, args) {
        const queue = getQueue();
        const queueNum = Number(args[0]);

        if (queueNum === 0) {
            return message.channel.send(
                "Can't remove playing song from queue."
            );
        }
        if (queueNum > queue.length - 1 || queueNum < 0) {
            return message.channel.send("Queue number outside range.");
        }

        const [removedSong] = queue.splice(queueNum, 1);
        setQueue(queue);
        console.log(removedSong);
        message.channel.send(`Removed Song: ${removedSong.title}`);
    },
};
