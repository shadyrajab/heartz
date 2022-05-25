const { MessageEmbed } = require('discord.js')

module.exports = class Avatar {
    constructor(client) {
        this.client = client
        this.name = 'avatar'
        this.description = 'Mostra o avatar de um usuário.'
        this.options = [{
            name: 'user',
            description: 'O usuário ou ID de usuário.',
            required: false,
            type: 'USER'
        }]
    }

    async execute (interaction) {
        const user = interaction.options.getUser('user') || interaction.user
        const embed = new MessageEmbed()
          .setImage(user.displayAvatarURL({ size: 2048, dynamic: true }))
          .setColor(0x2f3136)
          .setAuthor({name: user.username});

        await interaction.reply({ embeds: [embed], fetchReply: true });
    }
}