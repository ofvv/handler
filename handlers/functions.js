module.exports = async (client) => {
  require('discord-reply')
  require('discord-buttons')(client)
  require("discord-messages").setURL(process.env.DB)
  client.lib = require('discord.js');
  client.color = `#000001`;
  client.config = require(`${process.cwd()}/config.json`)
  client.sleep = async function(ms) {
    if (!ms) ms = 1;
    return new Promise(async resolve => setTimeout(resolve, ms));
  };
  client.translate = require("@iamtraction/google-translate");
  try {
    let h = Math.floor(Math.random() * 16777215).toString(16)
    client.randomHex = {
      hex: `#` + h,
      x: `0x` + h,
      result: h,
      hsl: require('color')(`#` + h).hsl().string(),
      rgb: require('color')(`#` + h).rgb().string(),
      preview: `https://www.colorhexa.com/${h}.png`,
    };
  } catch (e) {}
  client.codeblock = async function(code, language) {
    if (!language) language = 'yaml';
    if (!code) return `No Code Provided!`;
    return `\`\`\`${language}\n${code}\n\`\`\``;
  };

  client.eval = async function(toeval) {
    if (!toeval) return;
    try {
      let evaled = eval(toeval);
      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);
      return {
        code: toeval,
        type: typeof(evaled),
        output: evaled,
        final: `success`
      }
    } catch (e) {
      return {
        code: toeval,
        type: typeof(evaled),
        output: e,
        final: `error`
      }
    }
  };
  client.formatms = async function(ms) {
    const sec = Math.floor((ms / 1000) % 60).toString();
    const min = Math.floor((ms / (1000 * 60)) % 60).toString();
    const hrs = Math.floor((ms / (1000 * 60 * 60)) % 60).toString();
    const days = Math.floor((ms / (1000 * 60 * 60 * 24)) % 60).toString();
    return `${days.padStart(1, "0")}d ${hrs.padStart(2, "0")}h ${min.padStart(2, "0")}m ${sec.padStart(2, "0")}s`;
  };
  client.randomArray = async function(array) {
    if (!array) array = [];
    return array[Math.floor(Math.random() * array.length)];
  };
  client.trimArray = async function(arr, maxlen) {
    if (!arr) arr = [];
    if (!maxlen) maxlen = 20;
    if (arr.length > maxlen) {
      const len = arr.length - maxlen;
      arr = arr.slice(0, maxlen);
      arr.push(`And ${len} More...`);
    }
    return arr;
  };

  client.randomNumber = async function(start, end) {
    if (!min || !max) {
      min = 0;
      max = 100;
    }
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  client.reverseArray = async function(array) {
    if (!array) return [];
    else
    if (array) {
      return array.reverse();
    }
  }

  client.cleanCode = function clean(content) {
    if (content.startsWith('```') && content.endsWith('```')) {
      content = content.replace('```', '').replace('```', '')
      if (content.includes('js')) content = content.replace('js', '')
      return to;
    } else return content;
  }

  client.functions = {
    sleep: client.sleep,
    randomHex: client.randomHex,
    codeblock: client.codeblock,
    formatms: client.formatms,
    randomArray: client.randomArray,
    trimArray: client.trimArray,
    eval: client.eval,
    randomNumber: client.randomNumber,
    reverseArray: client.reverseArray,
    cleanCode: client.cleanCode
  }

}
