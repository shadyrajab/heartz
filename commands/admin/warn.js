const { MessageEmbed } = require('discord.js')
const warnScheme = require('../../database/warnScheme')

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
        const guildMember = guild.members.cache.get(member.id)
        const reason = await interaction.options.getString('reason')
        const channel = await guild.channels.cache.get('862897469448912923')
        const valert = await guild.emojis.cache.get('866025302270279680')
        const vexclaim = await guild.emojis.cache.get('866382237503193098')
        let warns = await warnScheme.findOne({userid: member.id})
        if (!warns) {
            await warnScheme.create({ userid: member.id, warns: 1})
            warns = await warnScheme.findOne({userid: member.id})
        }
        if (warns) {
            await warns.updateOne({ warns: warns.warns + 1})
            await warns.save().catch((err) => console.log(err))
            warns = await warnScheme.findOne({userid: member.id})
        }
        const embed = new MessageEmbed()
            .setAuthor({name: `Alerta de ${user.username}`, iconURL: user.avatarURL()})
            .setColor(0xf82840)
            .addField(`${vexclaim}︰Infrator: ${member.tag}\n🔧︰ID: ${member.id}\n${valert}︰Motivo: ${reason}`, `📝︰**Warns: ${warns.warns}/5**`, true)
            .setImage('https://i.imgur.com/t6DzVW5.png')
            .setFooter({text: 'Caso você receba 2 warns, receberá mute de 2 horas automaticamente, já com 5, mute de 1 dia.'})
        if (warns.warns === 2) {
            await guildMember.timeout(2 * 60 * 60 * 1000, reason)
        }
        if (warns.warns >= 5) {
            await guildMember.timeout(1 * 60 * 60  * 24 *  1000, reason)
        }
        await channel.send({content: `${member}`, embeds: [embed]})
    }
}