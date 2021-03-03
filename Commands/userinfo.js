const Discord = require('discord.js')
const colors = require('../colors.json')
const client = require('../index.js')
const db = require('quick.db')
const ms = require('ms')

module.exports = {
    name: 'userinfo',
    description: 'Know Others Information',
    usage: '?userinfo [mention]',
    category: 'Utility',
    guildOnly: true,
    async execute(message, args){
		if(args.length > 1) return message.channel.send('Only mention one user!');
    if(!args[0]) return message.channel.send('Mention someone!');

    if(args[0]){
      let member = message.mentions.members.first();

      if(member) {
        let embed = new Discord.MessageEmbed()
          .setColor("fffff")
          .setTitle("User Info")
          .setThumbnail(member.user.displayAvatarURL())
          .setAuthor(`${member.user.tag} (${member.id})`, member.user.displayAvatarURL())
          .addField("**Username:**", `${member.user.username}`, true)
          .addField("**Discriminator:**", `${member.user.discriminator}`, true)
          .addField("**ID:**", `${member.user.id}`, true)
          .addField("**Status:**", `${member.user.presence.status}`, true)
          .addField("**Joined On:**", `${member.joinedAt.toLocaleString()}`, true)
          .addField("**Created On:**", `${member.user.createdAt.toLocaleString()}`, true)
          .setDescription(`${member.roles.cache.map(role => role.toString()).join(' ')}`)
          .setFooter(`© ${message.guild.me.displayName}`, "https://cdn.discordapp.com/avatars/796748319518097419/6417c8b4c69da903eef8db73e435e5c3.png?size=512");

        message.channel.send(embed);
      } else {
          message.channel.send(`Could not find that member`);
      }
    }
	}
}
