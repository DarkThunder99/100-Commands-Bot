const Discord = require('discord.js')
const colors = require('../colors.json')
const client = require('../index.js')
const db = require('quick.db')

module.exports = {
    name: 'invite',
    description: 'Invite this bot to your server!',
    usage: 'invite',
    category: 'Utility',
    guildOnly: true,
    async execute(message, args) {
        let tosEmbed = new Discord.MessageEmbed()
            .setColor(colors.orange)
            .setTimestamp()
            .setFooter(message.client.user.username, message.client.user.displayAvatarURL())
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setDescription("By using this bot in your server, you agree to our ToS stated below.\n:warning: **If you do not agree to this, your server and user will be blacklisted from this bot.**")
            .addField('**1.** Raiding', 'This bot will not be part of any raiding or nuking in any server.')
            .addField('**2.** Discord ToS', 'You must not be abusing any rules of the [Discord ToS.](https://discord.com/terms)')
            .addField('**3.** Custom Commands', 'Some commands that you may see on our [support server]()')
            .addField('Confirming Your Entry:', '```\nTo confirm that you agree to our ToS, please react with ✅\nIf you do not see the reaction, please wait 10 seconds\n```')
        message.channel.send(tosEmbed).then(sMessage => {
            setTimeout(() => {
                sMessage.react('✅')
            }, 5000)

            const filter = (reaction, user) => {
                return ['✅', '❌'].includes(reaction.emoji.name) && user.id === message.author.id;
            };

            sMessage.awaitReactions(filter, {
                max: 1,
                time: 30000,
                errors: ['time']
            }).then(async collected => {
                const reaction = collected.first();
                if (reaction.emoji.name === "✅") {
                    
                    let userReactions = (sMessage.reactions.cache.filter(reaction => reaction.users.cache.has(message.author.id)))
                    for (const reaction of userReactions.values()) {
                        await reaction.users.remove(message.author.id);
                    }
                    reaction.users.remove(message.client.user.id)

                    let editEmbed = new Discord.MessageEmbed()
                        .setTitle(`${message.client.user.username} Bot Invite`)
                        .setColor(colors.orange)
                        .setTimestamp()
                        .setFooter(message.client.user.username, message.client.user.displayAvatarURL())
                        .setThumbnail(message.client.user.avatarURL())
                        .setDescription(`https://dsc.gg/gcafe`)
                    sMessage.edit(editEmbed)
                }
            })
        })
    }
}