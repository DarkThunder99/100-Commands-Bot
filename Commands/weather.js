const Discord = require('discord.js')
const colors = require('../colors.json')
const client = require('../index.js')
const db = require('quick.db')
const ms = require('ms')
const weather = require('weather-js');

module.exports = {
    name: 'weather',
    description: 'Know the Weather of a Place',
    usage: 'weather c/f [location]',
    category: 'Utility',
    guildOnly: true,
    async execute(message, args){
					const color = db.fetch(`embed_${message.guild.id}`) || "BLUE"
    if (!args.length) {
      return message.channel.send("Please give the weather location");
    }
    weather.find({ search: args.join(" "), degreeType: "C" }, function(
      err,
      result
    ) {
      if (result.length === 0) {
        message.channel.send("please enter a valid location");
        return;
      }
      var current = result[0].current; //Variable for the current part of the JSON Output
      var location = result[0].location; //This is a variable for the location part of the JSON Output
      try {
        let embed = new discord.MessageEmbed()
          .setTitle(`Weather - ${result[0].location.name}`)
          .setColor(color)
          .setDescription("Temperature units can may be differ some time")
          .addField("❯ Temperature", `${current.temperature} Celcius`, true)
          .addField("❯ Sky Text", current.skytext, true)
          .addField("❯ Humidity", current.humidity, true)
          .addField("❯ Timezone", `UTC${location.timezone}`, true) //Shows the timezone
          .addField("❯ Feels like", `${current.feelslike} Degrees`, true)
          .addField("❯ Degree Type", location.degreetype, true) //Shows the degrees in Celcius
          .addField("❯ Observation Time", current.observationtime, true)
          .addField("❯ Wind Display", current.winddisplay, true)
          .addField("❯ Day", `${current.day}`, true)
          .addField("❯ Date", `${current.date}`, true)

          .setThumbnail(current.imageUrl);
        message.channel.send(embed);
      } catch (err) {
        return message.channel.send("Unable To Get the data of Given location");
      }
    });
    }
}
