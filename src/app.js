const fs = require("fs");
const Discord = require("discord.js");
const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFiles = fs
  .readdirSync("./src/commands")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const Command = require(`./commands/${file}`);
  client.commands.set(Command.command, Command);
}

const prefix = require("./").config.prefix;

client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on("message", async (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  const Command = client.commands.get(command);
  if (!Command) return;

  const initializedCommand = new Command(message, args);
  initializedCommand.run();
});

client.login(process.env.DISCORD_TOKEN);
