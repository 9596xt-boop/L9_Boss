const { Client, GatewayIntentBits, REST, Routes, SlashCommandBuilder } = require('discord.js');

const TOKEN = process.env.TOKEN;
const CLIENT_ID = process.env.CLIENT_ID; // Application ID ของ bot
const GUILD_ID = process.env.GUILD_ID;   // Server ID ของคุณ

// สร้าง client
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// สร้างคำสั่ง /hello
const commands = [
  new SlashCommandBuilder()
    .setName('hello')
    .setDescription('Replies with Hello!')
].map(command => command.toJSON());

// ลงทะเบียนคำสั่งกับ server
const rest = new REST({ version: '10' }).setToken(TOKEN);
(async () => {
  try {
    console.log('Started refreshing application (/) commands.');
    await rest.put(
      Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
      { body: commands },
    );
    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();

// ตอบคำสั่งเมื่อ user พิมพ์ /hello
client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'hello') {
    await interaction.reply('Hello! 👋');
  }
});

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.login(TOKEN);
