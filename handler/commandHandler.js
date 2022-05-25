const { readdirSync } = require('fs')

module.exports = (client) => {
  const interactionCommands = [];
  const categories = readdirSync('./commands');
  for (const category of categories) {
    const subCategories = readdirSync(`./commands/${category}`);
    for (const subCategory of subCategories) {
      if (subCategory.includes('.')) {
        const constructor = require(`../commands/${category}/${subCategory}`);
        if (typeof constructor === 'object') {
          for (const command in constructor) {
            interactionCommands.push(new constructor[command](client));
          }
        } else interactionCommands.push(new constructor(client));
      } else {
        const subCommand = readdirSync(`./commands/${category}/${subCategory}`);
        const constructor = require(`../commands/${category}/${subCategory}/${subCommand}`);
        if (typeof constructor === 'object') {
          for (const command in constructor) {
            interactionCommands.push(new constructor[command](client));
          }
        } else interactionCommands.push(new constructor(client));
      }
    }
  }
  return interactionCommands;
};
