const Discord = require('discord.js')
const colors = require('../colors.json')
const client = require('../index.js')
const db = require('quick.db')
const ms = require('ms')
const randomPuppy = require('random-puppy');

module.exports = {
    name: 'meme',
    description: 'Get Random Memes',
    usage: '?meme',
    category: 'Fun',
    guildOnly: true,
    async execute(message, args){
    const subreddits = ['meme', 'meirl'];

    let rand = subreddits[Math.floor(Math.random() * subreddits.length)];
    
    let img = await randomPuppy(rand);
    
    let embed = new Discord.MessageEmbed()
      .setColor("fffff")
      .setTitle(`From /r/${rand}`)
      .setURL(`https://reddit.com/r/${rand}`)
      .setImage(img)
      .setFooter(`© ${message.guild.me.displayName}`, "https://cdn.discordapp.com/avatars/796748319518097419/6417c8b4c69da903eef8db73e435e5c3.png?size=512");
    
    message.channel.send(embed);
    }
}
