const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

const TOKEN = process.env.TOKEN;

client.on('messageCreate', message => {
  if (message.content === '!hello') {
    message.reply('Hello! 👋');
  }
});

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.login(TOKEN);
