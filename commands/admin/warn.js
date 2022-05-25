const { MessageEmbed } = require('discord.js')

module.exports = class Warn {
    constructor(client) {
        this.client = client
        this.name = 'warn'
        this.description = 'Alerta um usuário sobre uma devida infração.'
        this.permission = 'ADMINISTRATOR'
        this.options = [{
            name: 'user',
            description: 'O usuário ou ID que você deseja enviar um alerta.',
            required: true,
            type: 'USER'
        }, {
            name: 'reason',
            description: 'O motivo do alerta.',
            required: true,
            type: 'STRING'
        }]
    }
    
    async execute (interaction) {
        const { guild, user } = interaction
        const member = await interaction.options.getUser('user')
        const reason = await interaction.options.getString('reason')
        const channel = await guild.channels.cache.get('862897469448912923')
        const valert = await guild.emojis.cache.get('866025302270279680')
        const vexclaim = await guild.emojis.cache.get('866382237503193098')
        const embed = new MessageEmbed()
            .setAuthor({name: `Alerta de ${user.username}`, iconURL: user.avatarURL()})
            .setColor(0xf82840)
            .addField(`${vexclaim}︰Infrator: ${member.tag}\n🔧︰ID: ${member.id}\n${valert}︰Motivo: ${reason}`, `📝︰Warns: **1/5**`, true)
            .setImage('https://i.imgur.com/t6DzVW5.png')
        await channel.send({content: `${member}`, embeds: [embed]})
    }
}