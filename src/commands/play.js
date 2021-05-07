const ytdl = require("ytdl-core");
const {
    getQueue,
    addToQueue,
    getNextInQueue,
    removeNextInQueue,
    setQueue,
} = require("../queue.js");

module.exports = {
    name: "play",
    description: "Play audio from a youtube video.",
    async execute(message, args) {
        try {
            // if (broadcastDispatcher !== null) broadcastDispatcher.end;
            const [url] = args;

            const videoInfo = await ytdl.getBasicInfo(url);
            const videoTitle = videoInfo.videoDetails.title;

            if (!message.member.voice.channel) {
                throw new Error(
                    "You have to be in a voice channel to play something."
                );
            }
            if (!url) {
            }
            if (!ytdl.validateURL(url)) {
                throw new Error("Invalid Url");
            }

            const connection = await message.member.voice.channel.join();
            const newStream = ytdl(url, {
                filter: "audioonly",
            });

            const queue = getQueue();
            if (queue.length === 0) {
                addToQueue({
                    title: videoTitle,
                    stream: newStream,
                });
                await playSong(connection, message);
            } else {
                addToQueue({
                    title: videoTitle,
                    stream: newStream,
                });
                message.channel.send("Added To Queue");
            }
        } catch (error) {
            message.channel.send(error.message);
            console.log(error);
        }
    },
};

async function playSong(connection, message) {
    const { title, stream } = getNextInQueue();
    const dispatcher = connection.play(stream);

    connection.on("disconnect", () => {
        setQueue([]);
        dispatcher.destroy();
    });

    dispatcher.on("start", () => {
        message.channel.send(`Playing ${title}`);
    });

    dispatcher.on("finish", async () => {
        removeNextInQueue();
        const queue = getQueue();
        if (queue.length === 0) {
            message.channel.send("Finished Queue");
            connection.disconnect();
        } else {
            await timeout(4000);
            playSong(connection, message);
        }
    });
}

function timeout(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

// function isURL(str) {
//     const pattern = new RegExp(
//         "^(https?:\\/\\/)?" + // protocol
//             "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
//             "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
//             "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
//             "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
//             "(\\#[-a-z\\d_]*)?$",
//         "i"
//     ); // fragment locator
//     return !!pattern.test(str);
// }
