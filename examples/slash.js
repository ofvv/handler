module.exports = {
  name: "",
  settings: {
    global: {
      post: false
    },
    guild: {
      post: true,
      guilds: []
    }
  },
  options: [{
    name: "",
    description: "",
    type: 6,
    required: false,
    choices: [
          {
              "name": "",
              "value": ""
          }
      ]
  }],
  description: "",
  run: async (client, createAPIMessage, args, interaction, command, sendmsg, sendembed) => {}
}
