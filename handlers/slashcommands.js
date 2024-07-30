const {
  readdirSync
} = require("fs");

const ascii = require("ascii-table");

let table = new ascii("Slash Commands");
table.setHeading("Command", "Load status");

module.exports = async (client) => {
  readdirSync("./slashcommands/").forEach(dir => {
    const commands = readdirSync(`./slashcommands/${dir}/`).filter(file => file.endsWith(".js"));

    for (let file of commands) {
      let pull = require(`../slashcommands/${dir}/${file}`);

      if (pull.name) {
        client.slashcommands.set(pull.name, pull);
        table.addRow(file, '✅ Loaded');
      } else {
        table.addRow(file, `❌ Not Loaded`);
        continue;
      }
    }
    client.on('ready', async () => {
      client.slashcommands.forEach(async cmd => {
        if (!cmd.settings) {
          cmd.settings = {}
          cmd.settings.global = {}
          cmd.settings.guild = {}
          cmd.settings = {
            global: {
              post: cmd.settings.global.post || true
            },
            guild: {
              post: cmd.settings.guild.post || false,
              guilds: cmd.settings.guild.guilds || []
            }
          }
        }
        if (cmd.settings.guild.post === true && cmd.settings.guild.guilds) {
          cmd.settings.guild.guilds.forEach(async id => {
            client.api.applications(client.user.id).guilds(id).commands.post({
              data: {
                name: cmd.name,
                description: cmd.description,
                options: cmd.options || [] || null,
                permissions: cmd.permissions || ['SEND_MESSAGES'] || [] || null
              }
            }).then(async o => client.slashids.set(o.name, o))
          })
        } else if (cmd.settings.global.post === true) {
          client.api.applications(client.user.id).commands.post({
            data: {
              name: cmd.name,
              description: cmd.description,
              options: cmd.options || [] || null,
              permissions: cmd.permissions || ['SEND_MESSAGES'] || [] || null
            }
          }).then(async o => client.slashids.set(cmd.name, o))
        }
      })
    })
  });
  console.log(table.toString());


  client.args = async function(args, name, elsef) {
    if (!args) return;
    if (!name) return;
    if (!elsef) return;
    let data;
    if (args) {
      data = args.find(a => a.name.toLowerCase() === name).value
    } else data = elsef;
    return data;
  }

  client.choice = async function(args, name, elsef) {
    if (!args) return;
    if (!name) return;
    if (!elsef) return;
    let data;
    if (args) {
      let choice = args.find(a => a.name.toLowerCase() === name)
      if (choice) data = choice;
    } else data = elsef;
    return data;
  }
  client.slashfunctions = {
    choice: client.choice,
    args: client.args
  }
}
