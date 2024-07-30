require('dotenv').config()
const discord = require('discord.js')
const client = new discord.Client({
  disableMentions: 'everyone'
})
const config = require('./config.json')
client.config = config;
client.discord = discord;
client.library = discord;
client.commands = new discord.Collection();
client.events = new discord.Collection();
client.aliases = new discord.Collection();
client.slashcommands = new discord.Collection();
client.slashids = new discord.Collection();
client.collections = {
  commands: client.commands,
  events: client.events,
  aliases: client.aliases,
  slashcommands: client.slashcommands,
  slashids: client.slashids
};


["command", "events", "slashcommands", "functions", "db", "embeds"].forEach(handler => {
  require(`./handlers/${handler}`)(client);
});


client.login(process.env.TOKEN)
