
import {
    Client,
    GatewayIntentBits,
    /*EmbedBuilder,
    PermissionsBitField,
    Permissions,*/
  } from 'discord.js';
  
  
  export const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.GuildMembers,
      GatewayIntentBits.MessageContent
    ],
  });
  