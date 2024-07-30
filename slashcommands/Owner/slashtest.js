const discord = require("discord.js")

module.exports = {
    name: "slashtest",
    settings: {
      global: {
        post: true
      },
      guild: {
        post: false,
        guilds: ['609735513724944401']
      }
    },
    description: "Slash Test",
    run: async (client, createAPIMessage, args, interaction, command, sendmsg, sendembed) => {
      interaction.sendmsg(`Works!`)
    }
  }
