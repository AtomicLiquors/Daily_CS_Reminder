const express = require("express");
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

const fullTimeOptions = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
  timeZone: "Asia/Seoul",
};

const timeOptions = { timeZone: "Asia/Seoul", hour12: false };
const weekdayFormatter = new Intl.DateTimeFormat("en-US", {
  ...timeOptions,
  weekday: "narrow",
});

const utcOffsetHours = initOffsetHour();

/* 헬스 체크 엔드포인트 */
const app = express();
const PORT = 8000;

app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

app.listen(PORT, () => {
  console.log(`Express server running on port ${PORT}`);
});


const holidays = [];
initHolidays();

client.once(Events.ClientReady, (x) => {
  console.log(`${x.user.tag} is ready`);
  client.user.setActivity("동작");

  const channel = client.channels.cache.get(process.env.CHANNEL_ID);

  let currentDate;
  currentDate = getDate();

  //TO-DO : 공휴일 로직 추가하기.
  //TO-DO : CRON 최적화할 방법 더 알아보기.
  cron.schedule("* * * * *", function () {
    currentDate = getDate();

    console.log(currentDate.toLocaleString(
      "ko-KR"
    ));
    
    const weekday = weekdayFormatter.format(currentDate);
    const [month, day, hours, minutes] = getDateValuesFrom(currentDate);
    
    if(hours === 0 && minutes === 0 && month == 1 && day == 1)
      channel.send(
        `${currentDate.toLocaleString(
          "ko-KR"
        )}\n${holidays[1][1]}`
      );
    else if (hours === 7 && minutes === 30) {
      if (holidays[month][day])
        return;
      else if (weekday === "S")
        channel.send(
          `${currentDate.toLocaleString(
            "ko-KR"
          )}\n오늘은 주말입니다. 즐거운 주말 되세요!`
        );
      else
        channel.send(
          `${currentDate.toLocaleString(
            "ko-KR"
          )}\n오늘의 CS 퀴즈를 출제해주세요!`
        );
    }
  });
});

/* 메시지에 답장하는 로직 */
client.on(Events.MessageCreate, (msg) => {
  if (msg.author.bot) return;
  if (msg.content === "RUTHERE") {
    currentDate = new Date();

    msg.channel.send(
      `알림봇이 동작하고 있어요!\n현재 시간 : ${new Intl.DateTimeFormat(
        "ko-KR",
        fullTimeOptions
      ).format(currentDate)}`
    );
  }
});

client.login(process.env.DISCORD_BOT_ID);


function initOffsetHour(){
  let initDate = new Date();
  
  const seoulOffset = initDate.getTimezoneOffset('ko-KR');
  const serverOffset = initDate.getTimezoneOffset();

  return (seoulOffset - serverOffset) / 60;
}

function getDate(){
  const date = new Date();
  return date.setHours(date.getHours() + utcOffsetHours);
}

function getDateValuesFrom(date){
  return [
    date.getMonth() + 1,
    date.getDay(),
    date.getHours(),
    date.getMinutes(),
  ];
}

function initHolidays(){
  holidays[1][1] = "☀️2024년 새해가 밝았습니다!☀️\n새해에도 다함께 파이팅! 🎉🎉"
  holidays[2][9] = "🎊오늘은 설 연휴 시작입니다.🎊\n즐거운 명절 되세요!"
}