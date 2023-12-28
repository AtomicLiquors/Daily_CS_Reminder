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


client.once(Events.ClientReady, (x) => {
  console.log(`${x.user.tag} is ready`);
  client.user.setActivity("동작");

  const channel = client.channels.cache.get(process.env.CHANNEL_ID);
  let currentDate = new Date();

  //TO-DO : 공휴일 로직 추가하기.
  //TO-DO : CRON 최적화할 방법 더 알아보기.
  /*
  cron.schedule("* * * * *", function () {
    currentDate = new Date();
    const weekday = weekdayFormatter.format(currentDate);
    
    if(weekday === "S") 
      return;

    const hours = 9 + Number(hourFormatter.format(currentDate));
    const minutes = Number(minuteFormatter.format(currentDate));

    if(hours === 7 && minutes === 30)
      channel.send(`${currentDate.toLocaleString("ko-KR")}\n오늘의 CS 퀴즈를 출제해주세요!`);
    else if(hours === 8 && minutes === 30)
      channel.send(`현재 시간은 ${hours}시 ${minutes}분입니다.\n입실 체크하세요!`);
    else if(hours === 18 && minutes === 0)
      channel.send(`현재 시간은 ${hours}시 ${minutes}분입니다.\n퇴실 체크하세요!`);
  });
  */
});

/* 메시지에 답장하는 로직 */
client.on(Events.MessageCreate, (msg) => {
  if (msg.author.bot) return;
  if(msg.content === 'RUTHERE'){
    currentDate = new Date();
    
    msg.channel.send(`알림봇이 동작하고 있어요!\n현재 시간 : ${new Intl.DateTimeFormat("ko-KR", fullTimeOptions).format(currentDate)}`);
  }
});

client.login(process.env.DISCORD_BOT_ID);

