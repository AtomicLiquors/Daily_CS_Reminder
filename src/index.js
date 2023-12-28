// Watch my Discord Bot Project Tutorial video here: https://youtu.be/pDQAn18-2go - Discord Bot Tutorial | JavaScript & Node.js

require("dotenv").config();
const cron = require("node-cron");

const {
  Client,
  GatewayIntentBits,
  Events,
  EmbedBuilder,
  PermissionsBitField,
  Permissions,
} = require("discord.js");
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});


const timeOptions = { timeZone: "Asia/Seoul", hour12: false };
const hourFormatter = new Intl.DateTimeFormat("en-US", { ...timeOptions, hour: "numeric" });
const minuteFormatter = new Intl.DateTimeFormat("ko-KR", { ...timeOptions, minute: "numeric" });


client.once(Events.ClientReady, (x) => {
  console.log(`${x.user.tag} is ready`);
  client.user.setActivity("동작");

  const channel = client.channels.cache.get(process.env.CHANNEL_ID);
  const currentDate = new Date();
  channel.send("봇이 업데이트되었습니다! " + currentDate.toLocaleString("ko-KR"));

  cron.schedule("* * * * *", function () {
    const currentDate = new Date();
    const hours = Number(hourFormatter.format(currentDate));
    const minutes = Number(minuteFormatter.format(currentDate));

    if(hours === 8 && minutes === 30)
      channel.send(`현재 시간은 ${hours}시 ${minutes}분입니다.\n입실 체크하세요!`);
    else if(hours === 18 && minutes === 0)
      channel.send(`현재 시간은 ${hours}시 ${minutes}분입니다.\n퇴실 체크하세요!`);
    else if(hours === 10 && (minutes === 40 || minutes === 50))
      channel.send(`현재 시간은 ${hours}시 ${minutes}분입니다.\n테스트 완료!`);
  });
});

/* 메시지에 답장하는 로직 */
client.on(Events.MessageCreate, (msg) => {
  if (msg.author.bot) return;
  if(msg.content === 'RUTHERE')
  msg.channel.send('알림봇이 동작하고 있어요!');
});

client.login(process.env.DISCORD_BOT_ID);

