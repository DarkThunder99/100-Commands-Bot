const fetch = require('node-fetch');
const Discord = require('discord.js')
const colors = require('../colors.json')
const client = require('../index.js')
const db = require('quick.db')
const ms = require('ms')

module.exports = {
    name: 'pokemon',
    description: 'Know Info About Pokemons',
    usage: '?pokemon [pokimon name]',
    category: 'Fun',
    guildOnly: true,
    async execute(message, args){
    if(!args[0]) return message.channel.send('Enter a pokemon to search for!');

    const pokemon = args[0].toLowerCase();

    await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`).then(res => res.json()).then(res => {
      const data = res;
      const { sprites, name, id, types, abilities } = data; 

      let embed = new Discord.MessageEmbed()
        .setColor("Red")
        .setTitle(`${name.charAt(0).toUpperCase() + name.slice(1)} #${id}`)
        .setThumbnail(`${sprites.front_default}`);
        types.forEach(type => embed.addField('Type', type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1), true));
        abilities.forEach(ability => embed.addField('Ability', ability.ability.name.charAt(0).toUpperCase() + ability.ability.name.slice(1), true));
        embed.setFooter(`© ${message.guild.me.displayName}`, "https://cdn.discordapp.com/avatars/796748319518097419/6417c8b4c69da903eef8db73e435e5c3.png?size=512"); 

      message.channel.send(embed);
    }).catch(err => {
      console.log(err);
      message.channel.send(`The Pokemon ${pokemon} doesn't exist.`);
    });
    }
}
