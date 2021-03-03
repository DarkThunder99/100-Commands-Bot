const Discord = require('discord.js')
const ms = require('ms')
const fs = require('fs')
const chalk = require('chalk')
const db = require('quick.db')
const { token,PREFIX } = require('./config.json')
const client = new Discord.Client()

const colors = require('./colors.json')
const commandFiles = fs.readdirSync('./Commands').filter(file => file.endsWith('.js'))

client.commands = new Discord.Collection()
for (const file of commandFiles) {
    const command = require(`./Commands/${file}`);
    client.commands.set(command.name, command);
}
require("http").createServer((req, res) => res.end("alive")).listen();
client.once('ready', () => {

    console.log(chalk.bgGreenBright.black("[" + client.user.username + "]"), "Bot Online");
    client.user.setActivity('Made by DarkThunder', {
        type: "WATCHING"
    });
});

client.on('messageDelete', async message => {
    db.set(`msg_${message.channel.id}`, message.content)
    db.set(`author_${message.channel.id}`, message.author.id)
})

client.on('message', async message => {
	const prefix = PREFIX

    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return;
    try {
        command.execute(message, args, client);
        console.log(chalk.greenBright('[COMMAND]'), `${message.author.tag} used the command ` + commandName)
    } catch (error) {
        console.log(error);
        message.reply('there was an error trying to execute that command! ```\n' + error + "\n```");
    }
});

client.login(token)