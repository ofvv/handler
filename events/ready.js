const ascii = require("ascii-table");
const discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
let guildID = '609735513724944401';

const fetch = require("node-fetch")

module.exports.run = async (client) => {
  client.users.fetch("484701017015975936")
  let table = new ascii(`Bot`);
  table.addRow('On', '✅ ');
  console.log(table.toString())
}
