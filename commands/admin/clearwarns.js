const warnScheme = require('../../database/warnScheme')

module.exports = class ClearWarns {
    constructor(client) {
        this.client = client
        this.name = 'clearwarns'
        this.description = 'Limpa os warns de um usuário.'
        this.permission = 'ADMINISTRATOR'
        this.options = [{
            name: 'user',
            description: 'O usuário ou ID que você deseja remover os alertas.',
            required: true,
            type: 'USER'
        }]
    }
    async execute(interaction) {
        const user = interaction.options.getUser('user')
        const warns = await warnScheme.findOne({userid: user.id})
        if (!warns || !warns.warns) {
            return await interaction.reply({
                ephemeral: true,
                content: 'Este usuário não recebeu nenhum warn.'
            })
        }
        await warnScheme.deleteOne({userid: user.id})
        await interaction.reply({
            ephemeral: true,
            content: 'Você limpou o histórico de warns desse usuário com sucesso.'
        })
    }
}