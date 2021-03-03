const Discord = require('discord.js')
const colors = require('../colors.json')
const client = require('../index.js')
const db = require('quick.db')
const ms = require('ms')

module.exports = {
    name: 'tweet',
    description: 'TWEET',
    usage: 'tweet [message you want to tweet]',
    category: 'Fun',
    guildOnly: true,
    async execute(message, args){
			
        let user = message.author.username;
        let text = args.join(" ");

        let m = await message.channel.send("**Please wait...**");
        if(!text){
            return m.edit("You must enter a message!");
        }

        else {
            let res = await fetch(encodeURI(`https://nekobot.xyz/api/imagegen?type=tweet&username=${user}&text=${text}`));
            let json = await res.json();
            let attachment = new Discord.MessageAttachment(json.message, "tweet.png");
            await message.channel.send(`**New tweet by **<@${message.author.id}>`, attachment);
            m.delete({ timeout: 5000});
				}
    }
}
