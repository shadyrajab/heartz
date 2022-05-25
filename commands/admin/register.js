module.exports = class Register {
    constructor(client) {
        this.client = client
        this.name = 'register'
        this.description = 'Registra um usuário e seta seus cargos'
        this.permissions = 'ADMINISTRATOR'
        this.options = [{
            name: 'user',
            description: 'O usuário ou ID que você deseja registrar.',
            required: true,
            type: 'USER'
        }]
    }

    async execute (interaction) {
        
    }
}