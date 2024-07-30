module.exports = {
  name: "owner",
  channel: {
    voice: {
      bot: false,
      author: false
    },
    type: {
      nsfw: false
    }
  },
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
  blacklist: {
    servers: [],
    users: []
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
    dbtype: 'json',
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
    const translated = await client.translate(`hi`, {
      to: `bg`
    });
    
    console.log(translated)
  }
}
