require("dotenv").config();

const fs = require("fs");
const Discord = require("discord.js");
const client = new Discord.Client();
client.commands = new Discord.Collection();
const prefix = process.env.PREFIX || ".";

const commandFiles = fs
    .readdirSync("./src/commands")
    .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
    const c = require(`./commands/${file}`);
    c.names.forEach((name) => client.commands.set(name, c));
}

client.once("ready", () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.on("message", async (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName);
    if (!command) return;

    command.execute(message, args);
});

client.login(process.env.DISCORD_TOKEN);
