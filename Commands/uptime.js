const Discord = require('discord.js')
const colors = require('../colors.json')
const client = require('../index.js')
const db = require('quick.db')
const ms = require('ms')

module.exports = {
    name: 'uptime',
    description: 'See How much Time the Bot was Online',
    usage: '?uptime',
    category: 'Utility',
    guildOnly: true,
    async execute(message, args, client){
			  let totalSeconds = (client.uptime / 1000);
        let days = Math.floor(totalSeconds / 86400) || "0";
        totalSeconds %= 86400;
        let hours = Math.floor(totalSeconds / 3600) || "0";
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60) || "0";
        let seconds = Math.floor(totalSeconds % 60);

				if (days === "0"){
					const embedb = new Discord.MessageEmbed()
           .setTitle(`Uptime`)
           .addField("Hours", `${hours}`,true)
           .addField("Minutes", `${minutes}`,true)
           .addField("Seconds", `${seconds}`,true)
					 .setColor("fffff")
       message.channel.send(embedb);
				} else {

        const embed = new Discord.MessageEmbed()
           .setTitle(`Uptime`)
           .addField("Days", `${days}`,true)
           .addField("Hours", `${hours}`,true)
           .addField("Minutes", `${minutes}`,true)
           .addField("Seconds", `${seconds}`,true)
					 .setColor("fffff")
       message.channel.send(embed);
    }}
}
