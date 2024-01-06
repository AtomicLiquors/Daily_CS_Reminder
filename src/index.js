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

const utcOffsetHours = 9;

/* 헬스 체크 엔드포인트 */
const app = express();
const PORT = 8000;

app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

app.listen(PORT, () => {
  console.log(`Express server running on port ${PORT}`);
});


/* 휴일 관리 */
const holidays = [];
initHolidays(holidays);
let month, day, hours, minutes;


const defaultMeeting = {
  weekday: "F",
  hour: 18,
  minute: 0,
  modified: false
}

const meetingInfo = {...defaultMeeting};

client.once(Events.ClientReady, (x) => {
  console.log(`${x.user.tag} is ready`);
  client.user.setActivity("동작");

  const channel = client.channels.cache.get(process.env.CHANNEL_ID);

  let currentDate;
  //TO-DO : 공휴일 추가 구현하기.
  //TO-DO : 화상회의 일자 변경 구현하기.
  //TO-DO : CRON 최적화할 방법 더 알아보기.

  //TO-DO : CRON 로직 시간 기다리지 않고 테스트할 방법 알아보기.
  cron.schedule("* * * * *", () => {
    currentDate = createDate();

    const weekday = weekdayFormatter.format(currentDate);
    [month, day, hours, minutes] = getDateValuesFrom(currentDate);

    console.log(`${month}월 ${day}일 ${hours}시 ${minutes}분`);

    //weekday string으로 표기하는 건 Tuesday랑 Thursday가 겹친다.

    if(weekday === meetingInfo.weekday){
      if (hours === 7 && minutes === 30) {
        channel.send(
          `${currentDate.toLocaleString(
            "ko-KR"
          )}
          \n오늘은 화상회의 날입니다.
          \n발표, 퀴즈를 준비해 주시고
          \n${meetingInfo.hour}시 ${meetingInfo.minute}분에 만나요!`
        );
      } else if (hours === meetingInfo.hour && minutes === meetingInfo.minute){
        channel.send(
          `${hours}시 ${minutes}분입니다.
          \n음성 채널로 접속해 주세요!`
        );
      }
    } else if (hours === 7 && minutes === 30) {
      if(weekday === "S")
      //To-Do : 주말 한정으로 미팅 일정 초기값으로 되돌리기.
        return;
      else if(holidays[month][day])
        return;
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

function createDate(){
  const date = new Date();
  date.setHours(date.getHours() + utcOffsetHours);
  return date;
}

function getDateValuesFrom(date){
  return [
    date.getMonth() + 1,
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
  ];
}

function initHolidays(holidays){
  for(let i = 1; i <= 12; i++){
    holidays[i] = [];
  }
  
  holidays[1][1] = "☀️2024년 새해가 밝았습니다!☀️\n새해에도 다함께 파이팅! 🎉🎉"
  holidays[2][9] = "🎊오늘은 설 연휴 시작입니다.🎊\n즐거운 명절 되세요!"
}


//To-Do : 코드 쪼개기