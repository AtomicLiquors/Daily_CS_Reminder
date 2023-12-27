// Watch my Discord Bot Project Tutorial video here: https://youtu.be/pDQAn18-2go - Discord Bot Tutorial | JavaScript & Node.js

require('dotenv').config();

const axios = require('axios');
const { Client, GatewayIntentBits, EmbedBuilder, PermissionsBitField, Permissions } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });


client.on('ready', () => {
    console.log('bot is ready');
    client.user.setActivity('봇이 동작하고 있습니다!');
})

// client.login(TOKEN);

client.on('messageCreate', async (message) => {
    if (message.content === 'ping') {
        message.reply({
            content: 'pong',
        })
    }
    else if (message.content === 'quote') {
        let resp = await axios.get(`https://api.quotable.io/random`);
        const quote = resp.data.content;

        message.reply({
            content: quote,
        })
    }
})

client.login(process.env.DISCORD_BOT_ID);