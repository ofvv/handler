const discord = require("discord.js")
const {
  MessageEmbed
} = require("discord.js")
const moment = require("moment")
const config = require('../../config.json');
const sourcebin = require('sourcebin_js')

const flags = {
  DISCORD_EMPLOYEE: '<:DiscordStaff:753998532922572911>',
  DISCORD_PARTNER: '<:PartneredServerOwner:753998458452574209>',
  BUGHUNTER_LEVEL_1: '<:BugHunter:753998213039783984>',
  BUGHUNTER_LEVEL_2: '<:CH_BadgeBugHunterGold:753999273410166914>',
  HYPESQUAD_EVENTS: '<:HypeSquadEvents:753998401582137395>',
  HOUSE_BRAVERY: '<:HypeSquadBravery:753998354228314272>',
  HOUSE_BRILLIANCE: '<:HypeSquadBrilliance:753998303166857248>',
  HOUSE_BALANCE: '<:HypeSquadBalance:753998256853483601>',
  EARLY_SUPPORTER: '<:EarlySupporter:753998119691354123>',
  TEAM_USER: 'Team User',
  SYSTEM: 'System',
  VERIFIED_BOT: '<:VerifiedBot1:759688234761715734><:VerifiedBot2:759688234904453161>',
  VERIFIED_DEVELOPER: '<:EarlyVerifiedBotDeveloper:753998037554167850>'
};


module.exports = {
  name: "userinfo",
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
  aliases: ['ui'],
  description: "Info About a User!",
  usage: "handler!ui <@user>",
  category: "Info",
  run: async (client, message, args, prefix) => {
    const guild = message.guild
    let user = message.mentions.users.first() || guild.members.cache.find(m => m.user.tag === args[0]) || guild.members.cache.get(args[0]) || message.author;
    let member = guild.members.cache.get(user.id)
    if (user.avatarURL === undefined || user.avatarURL == null) return message.lineReplyNoMention("An Error Has Occured")
    const userFlags = user.flags.toArray();
    var permissions = [];
    var acknowledgements = 'Server Member';
    if (member) {
      if (member.hasPermission("KICK_MEMBERS")) {
        permissions.push("Kick Members");
      }

      if (member.hasPermission("BAN_MEMBERS")) {
        permissions.push("Ban Members");
        acknowledgements = 'Server Mod';
      }

      if (member.hasPermission("ADMINISTRATOR")) {
        permissions.push("Administrator");
        acknowledgements = 'Server Admin';
      }

      if (member.hasPermission("MANAGE_MESSAGES")) {
        permissions.push("Manage Messages");
      }

      if (member.hasPermission("MANAGE_CHANNELS")) {
        permissions.push("Manage Channels");
      }

      if (member.hasPermission("MENTION_EVERYONE")) {
        permissions.push("Mention Everyone");
      }

      if (member.hasPermission("MANAGE_NICKNAMES")) {
        permissions.push("Manage Nicknames");
      }

      if (member.hasPermission("MANAGE_ROLES")) {
        permissions.push("Manage Roles");
      }

      if (member.hasPermission("MANAGE_WEBHOOKS")) {
        permissions.push("Manage Webhooks");
      }

      if (member.hasPermission("MANAGE_EMOJIS")) {
        permissions.push("Manage Emojis");
      }

      if (permissions.length == 0) {
        permissions.push("No Permissions Found");
      }

      if (member.user.id == guild.ownerID) {
        acknowledgements = 'Server Owner';
      }
    }

    if (user.bot) {
      acknowledgements = 'Server Bot';
    }

    if (user.id == config.owner) {
      acknowledgements = 'Bot Owner';
    }

    if (user.id == client.user.id) {
      acknowledgements = client.user.username;
    }

    function trimArray(arr, maxlen = 20) {
      if (arr.length > maxlen) {
        const len = arr.length - maxlen;
        arr = arr.slice(0, maxlen);
        arr.push(`And ${len} More...`);
      }
      return arr;
    }

    let xxx;
    if (user.avatarURL()) xxx = user.avatarURL({
      dynamic: true
    });
    let discrim;
    if (user.discriminator) discrim = user.discriminator;
    if (xxx.includes('gif') && !member.user.bot) nitro = `<:Nitro:753998173944414420>`;
    else nitro = '';
    if (discrim === '9999' || discrim === '0001' || discrim === '6969' || discrim === '1111' || discrim === '2222' || discrim === '3333' || discrim === '4444' || discrim === '5555' || discrim === '6666' || discrim === '7777' || discrim === '8888' || discrim === '9999');
    else nitro = '';

    let arrayroles = [];
    if (member && member.roles) {
      member.roles.cache.forEach(async role => {
        arrayroles.push(`@` + role.name)
      });
    }

    let format;

    if (xxx.includes('gif')) format = 'gif';
    else if (xxx.includes('png')) format = 'png';
    else if (xxx.includes('jpg')) format = 'jpg';
    else if (xxx.includes('jpeg')) format = 'jpg';
    else if (xxx.includes('webp')) format = 'webp';
    else format = 'webp';

    let activities = [];
    let clients = [];
    if (user.presence) {
    for (const activity of user.presence.activities.values()) {
      switch (activity.type) {
        case 'PLAYING':
          activities.push(`Playing ${activity.name}`);
          break;
        case 'LISTENING':
          if (user.bot) activities.push(`Listening to ${activity.name}`);
          else activities.push(`Listening to ${activity.details} by ${activity.state}`);
          break;
        case 'WATCHING':
          activities.push(`Watching ${activity.name}`);
          break;
        case 'STREAMING':
          activities.push(`Streaming ${activity.name}`);
          break;
        case 'CUSTOM_STATUS':
          customStatus = activity.state;
          break;
      }
    }
    if (user.presence.clientStatus.desktop) clients.push(`Desktop`)
    if (user.presence.clientStatus.web) clients.push(`Web Browser`)
    if (user.presence.clientStatus.mobile) clients.push(`Mobile Phone`)
  }
  // const infofordevs = {
  //   user: user,
  //   member: member,
  //   guild: guild,
  //   other: {
  //     clients: clients,
  //     activities: activities,
  //     badges: userFlags
  //   }
  // }
  // let source = await sourcebin.create([
  //     {
  //         name: `${user.id}`,
  //         content: `[${infofordevs}]`,
  //         languageId: 'js'
  //     }
  //   ], {
  //        title: `Userinfo: ${user.id}`,
  //        description: `Object`
  //  }).catch(e => {})


    let embed = new MessageEmbed()
    if (embed) embed.setColor("#000000")
    if (user.avatarURL()) embed.setThumbnail(user.displayAvatarURL({
      size: 1024,
      dynamic: true
    }))
    if (user.tag) embed.addField("**Username:**", `\`\`\`yaml\n${user.tag}\n\`\`\``, true)
    if (user.createdAt) embed.addField("**Created At:**", `\`\`\`yaml\n${moment.utc(user.createdAt).format("LL LTS")}\n\`\`\``) //.addField("Joined At:", `${moment(user.joinedAt).format('LL LTS')}`, true)
    if (member) embed.addField("**Joined At:**", `\`\`\`yaml\n${moment(member.joinedAt).format('LL LTS')} (${moment(member.joinedAt).fromNow()})\n\`\`\``)
    if (user.id) embed.addField("**User ID:**", `\`\`\`yaml\n${user.id}\n\`\`\``, false)
    if (acknowledgements) embed.addField(`**Acknowledgements:**`, `\`\`\`yaml\n${acknowledgements}\n\`\`\``, false)
    if (permissions[0]) embed.addField(`**Permissions:**`, `\`\`\`yaml\n${permissions.join(', ')}\n\`\`\``, false)
    if (arrayroles[0]) embed.addField(`**Total Roles [${arrayroles.length - 1}]**`, `\`\`\`yaml\n${trimArray(arrayroles).slice(0, -1).join(', ') || '@everyone'}\n\`\`\``)
    if (member.premiumSince) embed.addField(`**Boosting Since:**`, `\`\`\`yaml\n${member.premiumSince || "Not Boosting This Server"} (Not Exact)\n\`\`\``, false)
    if (activities[0]) embed.addField(`**Activities**`, `\`\`\`yaml\n${activities.join('\n') || 'No Activities'}\n\`\`\``, false)
    if (user.presence.status) embed.addField(`**Status**`, `\`\`\`yaml\n${user.presence.status.toUpperCase() || 'Not Detected'}\n\`\`\``, true)
    if (clients[0]) embed.addField(`**Clients**`, `\`\`\`yaml\n${clients.join('\n') || 'Not Detected'}\n\`\`\``, false)
    if (userFlags || nitro != '') embed.addField(`**Badges**`, `**${userFlags.length ? userFlags.map(flag => flags[flag]).join(' ') : 'None'} ${nitro}\n(Not Exact)**`, true)
    if (user.avatarURL()) embed.addField(`**Avatar**`, `**[Link](${user.displayAvatarURL({	dynamic: true, })})\n[Format: ${format}](${user.displayAvatarURL({	dynamic: true, })})**`, true)
    //if (source) embed.addField(`**Info For Developers**`, `**[Source](${source.files[0].raw})**`, true)
    if (client.user) embed.setFooter(`${client.user.username} ${new Date().getFullYear()} ©`);
    message.lineReplyNoMention(embed)
  }
}
