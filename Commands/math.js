const Discord = require('discord.js')
const colors = require('../colors.json')
const client = require('../index.js')
const db = require('quick.db')
const ms = require('ms')
const math = require("mathjs");

module.exports = {
    name: 'math',
    description: 'Solve your Math Sums',
    usage: 'Eg: math 1+1 | 1*4 | 34-23*4/2',
    category: 'Utility',
    guildOnly: true,
    async execute(message, args){
    try {
      if (!args[0]) return message.channel.send("Please Give Me Equation!");
			let say = args[0]

      const embed = new Discord.MessageEmbed()
			.setAuthor(`Calculator`,`https://cdn.discordapp.com/avatars/786437005021413376/275b8ecf47ea65128e18c2ae0fffc1a2.webp?size=4096`)
        .setColor("GREEN")
				.addField("Operation",`\`\`\`yaml\n${say}\`\`\``)
				.addField("Answer", `\`\`\`yaml\n${math.evaluate(args.join(" "))}\`\`\``)
				.setFooter(message.guild.name, message.guild.iconURL())
        .setTimestamp();
      message.channel.send(embed);
    } catch (error) {
      message.channel.send(`Please Give Me Valid Equation | Try Again Later!`).then(() => console.log(error));
    }
		}
}
