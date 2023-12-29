const express = require('express');
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


const fullTimeOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZone: 'Asia/Seoul' };
const timeOptions = { timeZone: "Asia/Seoul", hour12: false };
const weekdayFormatter = new Intl.DateTimeFormat("en-US", { ...timeOptions, weekday: "narrow" });
const hourFormatter = new Intl.DateTimeFormat("en-US", { ...timeOptions, hour: "numeric" });
const minuteFormatter = new Intl.DateTimeFormat("ko-KR", { ...timeOptions, minute: "numeric" });

/* 헬스 체크 엔드포인트 */
const app = express();
const PORT = 8000;

app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

app.listen(PORT, () => {
  console.log(`Express server running on port ${PORT}`);
});


client.once(Events.ClientReady, (x) => {
  console.log(`${x.user.tag} is ready`);
  client.user.setActivity("동작");

  const channel = client.channels.cache.get(process.env.CHANNEL_ID);
  let currentDate = new Date();

  //TO-DO : 공휴일 로직 추가하기.
  //TO-DO : CRON 최적화할 방법 더 알아보기.
  cron.schedule("* * * * *", function () {
    currentDate = new Date();
    console.log(`current Server Date: \n${currentDate}`);
    console.log( `formatted Date: \n${new Intl.DateTimeFormat("ko-KR").format(currentDate)}`);
    const weekday = weekdayFormatter.format(currentDate);
    /*
    if(weekday === "S") 
      return;
*/
    const hours = 9 + Number(hourFormatter.format(currentDate));
    const minutes = Number(minuteFormatter.format(currentDate));

    if(hours === 7 && minutes === 30){
      if(weekday === "S")
        channel.send(`${currentDate.toLocaleString("ko-KR")}\n오늘은 주말입니다. 즐거운 주말 되세요!`);
      else
        channel.send(`${currentDate.toLocaleString("ko-KR")}\n오늘의 CS 퀴즈를 출제해주세요!`);
    }
      
  });
});

/* 메시지에 답장하는 로직 */
client.on(Events.MessageCreate, (msg) => {
  if (msg.author.bot) return;
  if(msg.content === 'RUTHERE'){
    currentDate = new Date();
    
    msg.channel.send(`알림봇이 동작하고 있어요!\n현재 시간 : ${new Intl.DateTimeFormat("ko-KR", fullTimeOptions).format(currentDate)}`);
  }
});

client.on(Events.MessageCreate, (msg) => {
  if (msg.author.bot) return;
  if(msg.content === 'RUTHERE'){
    currentDate = new Date();
    
    msg.channel.send(`알림봇이 동작하고 있어요!\n현재 시간 : ${new Intl.DateTimeFormat("ko-KR", fullTimeOptions).format(currentDate)}`);
  }
});

client.login(process.env.DISCORD_BOT_ID);

