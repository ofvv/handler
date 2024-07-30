module.exports = {
  name: "",
  owner: {
    owners: [],
    ownerOnly: false
  },
  server: {
    servers: [],
    serverOnly: false
  },
  permissions: {
    bot: [],
    author: []
  },
  blacklist: {
    servers: [],
    users: []
  },
  bots: {
    use: false
  },
  allowed: {
    server: true,
    dm: false
  },
  cooldown: {
    db: false,
    dbtype: "local",
    cd: 0
  },
  ghostbot: {
    botdelete: true,
    authordelete: true,
    deleteafter: 30000,
    enabled: false
  },
  channel: {
    voice: {
      bot: false,
      author: false
    },
    type: {
      nsfw: false
    }
  },
  user: {
    age: 1000
  },
  aliases: [],
  description: "",
  usage: "",
  category: "",
  run: async (client, message, args, prefix) => {}
}
