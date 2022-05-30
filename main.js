const { Client, Intents } = require('discord.js')
const mongoose = require('mongoose')
const getCommands = require('./handler/commandHandler')
require('dotenv').config()

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_VOICE_STATES,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.DIRECT_MESSAGES
    ],
});

const commands = getCommands(client);

client.on('ready', client => {
    console.log(`${client.user.username} is online`)
    client.application.commands.set(commands)
})

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return
    const { guild, commandName, channel, client } = interaction
    const command = commands.find((command) => command.name === commandName)
    const commandPermission = command.permissions
    const botPermissions = (await guild.members.fetch(client.user.id)).permissionsIn(channel).toArray();
    if (commandPermission && !botPermissions.find(permission => permission === commandPermission)) {
        return interaction.reply(`Você precisa da permissão de **${commandPermission}** para utilizar este comando.`)
    }
    try {
        await command.execute(interaction)
    } catch(err) { 
        await interaction.reply({
            ephemeral: true,
            content: `Algum erro impediu este comando de ser utilizado: **${err}**`
        })
    }
})

client.login(process.env.TOKEN)
mongoose.Promise = global.Promise;
mongoose.connect(process.env.CONNECTION)
    .catch((err) => console.log(`Error while connection: ${err}`))