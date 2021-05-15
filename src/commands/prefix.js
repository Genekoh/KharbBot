const { getPrefix, setPrefix } = require("../states.js");

module.exports = {
    name: "prefix",
    description: "Set the prefix of commands",
    execute(message, args) {
        const [newPrefix] = args;
        const currentPrefix = getPrefix();

        if (!newPrefix || newPrefix === " ") {
            return message.channel.send("Invalid prefix");
        }

        if (newPrefix === currentPrefix) {
            return message.channel.send(
                `${currentPrefix} is already the current prefix`
            );
        }

        setPrefix(newPrefix);
        return message.channel.send(
            `Changed prefix from ${currentPrefix} to ${newPrefix}`
        );
    },
};
