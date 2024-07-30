const { readdirSync } = require("fs");

const ascii = require("ascii-table");

let table = new ascii("Commands");
table.setHeading("Command", "Load status");

module.exports = async (client) => {
    readdirSync("./commands/").forEach(dir => {
        const commands = readdirSync(`./commands/${dir}/`).filter(file => file.endsWith(".js"));

        for (let file of commands) {
            let pull = require(`../commands/${dir}/${file}`);

            if (pull.name) {
              if (!pull.description) pull.description = `${pull.name.charAt(0).toUpperCase() + pull.name.slice(1)} Command`;
              if (!pull.category) pull.category = `Uncategorized`;
              if (!pull.usage) pull.usage = `${require(`${process.cwd()}/config.json`).bot.prefixes.normalPrefix || `z!`}${pull.name}`;
                client.commands.set(pull.name, pull);
                table.addRow(file, '✅ Loaded');
            } else {
                table.addRow(file, `❌ Not Loaded`);
                continue;
            }

            if (pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => client.aliases.set(alias, pull.name));
        }
    });
    console.log(table.toString());
}

/**
 * Old layout:
 * module.exports = {
 *  name: "Command name",
 *  aliases: ["array", "of", "aliases"]
 *  category: "Category name",
 *  description: "Command description"
 *  usage: "[args input]",
 *  run: (client, message, args, prefix) => {
 *      The code in here to execute
 *  }
 * }
 */

/*
New layout:
module.exports = {
    name: '',
    category: '',
    ownerOnly: false, // tva e zaduljitelno btw (ako imam cooldown ili bot/authorperms)
    cooldown: 5000, // kat cqlo she e dobre vsichko da se addva
    authorPermission: ["BAN_MEMBERS"],
    botPermission: ["BAN_MEMBERS"],
    description: '',
    aliases: [''],
    usage: '',
    run: async (client, message, args, prefix) => {
  message.channel.send(`lol`)
  }}

*/

/*
BEST LAYOUT:
module.exports = {
  name: "owner",
  guildOnly: false,
  owner: {
    owners: ['484701017015975936'],
    ownerOnly: true
  },
  server: {
    servers: [],
    serverOnly: false
  },
  permissions: {
    bot: [],
    author: []
  },
  bots: {
    use: false
  },
  allowed: {
    server: true,
    dm: true
  },
  cooldown: {
    db: true,
    cd: 5000
  },
  ghostbot: {
    botdelete: true,
    authordelete: true,
    deleteafter: 2000,
    enabled: true
  },
  aliases: ["ownercmd"],
  description: "Owner Test",
  usage: "z!ownercmd",
  category: "Owner",
  run: async (client, message, args, prefix) => {
    message.lineReplyNoMention(`hi`)
  }
}

*/
