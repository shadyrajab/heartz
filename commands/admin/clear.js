module.exports = class Avatar {
    constructor(client) {
        this.client = client
        this.name = 'clear'
        this.description = 'Limpa uma quantidade de mensagens de um chat.'
        this.permissions = 'MANAGE_MESSAGES'
        this.options = [{
            name: 'number',
            description: 'O número de mensagens que você deseja limpar.',
            required: true,
            type: 'NUMBER'
        }]
    }

    async execute (interaction) {
        const number = interaction.options.getNumber('number')
        const { channel } = interaction
        await channel.bulkDelete(number)
        await interaction.reply(`${interaction.user} limpou **${number}** mensagens no canal ${channel}`);
    }
}