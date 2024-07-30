const discord = require("discord.js")

module.exports = {
    name: "getmember",
    settings: {
      global: {
        post: false
      },
      guild: {
        post: true,
        guilds: []
      }
    },
    options: [
        {
          name: "member",
          description: "Member",
          type: 6,
          required: false
        }
      ],
    description: "Get Member",
    run: async (client, createAPIMessage, args, interaction, command, sendmsg, sendembed) => {
      let userid;

      if (args) {
        userid = args.find(u => u.name).value
      } else userid = interaction.member.user.id;

      let member = await interaction.getMember(userid)
      console.log(member)
    }
  }
