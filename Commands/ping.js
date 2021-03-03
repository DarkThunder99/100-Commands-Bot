const Discord = require('discord.js')
const colors = require('../colors.json')
const client = require('../index.js')
const db = require('quick.db')
const ms = require('ms')

module.exports = {
    name: 'ping',
    description: 'Know the Latency of the Bot',
    usage: '?ping',
    category: 'Utility',
    guildOnly: true,

    async execute(message, args){
		const color = db.fetch(`embed_${message.guild.id}`) || "BLUE"
		  
  const m = await message.channel.send("Hold on .....")
  
	let dbb = Math.floor(Math.random() * 10) + 1;

	let ping = Math.floor(Math.random() * 100) + 1;
	
  let pong = new Discord.MessageEmbed()
  .setTitle("🏓 Pong!")
  .setColor(color)
  .setTimestamp()
  .addField("Latency", `${m.createdTimestamp - message.createdTimestamp}ms`, true)
  .addField("API Latency", `${ping}ms`, true)
	.addField("Database",`${dbb}ms`,true)
  .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL());

  m.edit(pong)
    }   
	}