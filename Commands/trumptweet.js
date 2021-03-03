const Discord = require('discord.js')
const colors = require('../colors.json')
const client = require('../index.js')
const db = require('quick.db')
const ms = require('ms')

module.exports = {
    name: 'trumptweet',
    description: 'TWEET',
    usage: 'tweet [message you want to tweet]',
    category: 'Fun',
    guildOnly: true,
    async execute(message, args){
        let text = args.join(" ");

        let m = await message.channel.send("**Please wait...**");
        if(!text){
            return m.edit("You must enter a message!");
        }

        else {
            let res = await fetch(encodeURI(`https://nekobot.xyz/api/imagegen?type=trumptweet&text=${text}`));
            let json = await res.json();
            let attachment = new Discord.MessageAttachment(json.message, "tweet.png");
            await message.channel.send( attachment );
            m.delete({ timeout: 5000});
				}
    }
}
