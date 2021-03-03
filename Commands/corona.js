const Discord = require('discord.js')
const colors = require('../colors.json')
const client = require('../index.js')
const db = require('quick.db')
const ms = require('ms')
const api = require('novelcovid');

module.exports = {
    name: 'corona',
    description: 'Know the Corona Stats',
    usage: 'corona all | state [state] | [country]',
    category: 'Utility',
    guildOnly: true,
    async execute(message, args){
			    if(!args[0]) {
      return message.channel.send("Search for a country, state, or get information about every country by typing !corona all.");
    }

    if(args[0] === "all") {
      await api.all().then((data) => {
        let embed = new MessageEmbed()
          .setTitle("Global Cases")
          .setColor(green_dark)
          .addField("Total Cases", data.cases, true)
          .addField("Total Deaths", data.deaths, true)
          .addField("Total Recovered", data.recovered, true)
          .addField("Today's Cases", data.todayCases, true)
          .addField("Today's Deaths", data.todayDeaths, true)
          .addField("Active Cases", data.active, true)
          .setFooter(`© ${message.guild.me.displayName}`, client.user.displayAvatarURL());
      
        return message.channel.send(embed);
      }).catch(err => console.log(err));
      
      
    } else if (args[0] === "state"){
      if(!args[1]){
          return message.channel.send("You have to enter a state to search for!");
      } else{
        let state = args.slice(1).join(' ');
        await api.states({state: state}).then((data) => {
          if(data.state === undefined) return message.channel.send("Are you sure that state exists?");
          let embed = new MessageEmbed()
            .setTitle(`${data.state}`)
            .setColor(green_dark)
            .addField("Total Cases", data.cases, true)
            .addField("Total Deaths", data.deaths, true)
            .addField("Today's Cases", data.todayCases, true)
            .addField("Today's Deaths", data.todayDeaths, true)
            .addField("Active Cases", data.active, true)
            .setFooter(`© ${message.guild.me.displayName}`, client.user.displayAvatarURL());
          
          return message.channel.send(embed);
        }).catch(err => console.log(err));
      }
    } else{
      let country = args.slice(0).join(' ');

      await api.countries({country: country}).then((data) => {
        if(data.country === undefined) return message.channel.send("Are you sure that country exists?");
        let embed = new MessageEmbed()
          .setTitle(`${data.country}`)
          .setColor(green_dark)
          .addField("Total Cases", data.cases, true)
          .addField("Total Deaths", data.deaths, true)
          .addField("Total Recovered", data.recovered, true)
          .addField("Today's Cases", data.todayCases, true)
          .addField("Today's Deaths", data.todayDeaths, true)
          .addField("Active Cases", data.active, true)
          .setFooter(`© ${message.guild.me.displayName}`, client.user.displayAvatarURL());
            
        return message.channel.send(embed);
      }).catch(err => console.log(err));
    }
    }
}
