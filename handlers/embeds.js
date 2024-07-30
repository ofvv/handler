module.exports = async (client) => {
  client.embedbuild = new client.library.MessageEmbed()
  client.embeds = {
    embedbuild: client.embedbuild
  }
}
