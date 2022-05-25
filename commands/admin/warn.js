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
            name: 'message',
            description: 'A mensagem do alerta.',
            required: true,
            type: 'STRING'
        }]
    }
    
    async execute (interaction) {
        
    }
}