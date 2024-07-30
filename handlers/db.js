const {
  Database
} = require('quickmongo');
const dotjson = require("easy-json-database")
const config = require(`${process.cwd()}/config.json`)

module.exports = async (client) => {
  client.db = new Database(process.env.DB)
  client.data = {
    functions: {
      get: async function(get) {
        if (!get) return;
        let result = await client.db.get(get) || 0;
        return result;
      }
    }
  }
  client.dbs = {
    mongo: new Database(process.env.DB),
    json: new dotjson("./db.json", {
      snapshots: {
        enabled: false,
        interval: 24 * 60 * 60 * 1000,
        folder: './db/'
      }
    })
  }
  client.db.functions = {}
}
