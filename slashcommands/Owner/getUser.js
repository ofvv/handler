const discord = require("discord.js")

module.exports = {
    name: "getuser",
    options: [
        {
          name: "user",
          description: "User",
          type: 6,
          required: false
        }
      ],
    description: "Get User",
    run: async (client, createAPIMessage, args, interaction, command, sendmsg, sendembed) => {
      let userid;

      if (args) {
        userid = args.find(u => u.name).value
      } else userid = interaction.member.user.id;

      let member = await interaction.getUser(userid)
      console.log(member)
    }
  }
