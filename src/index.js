import * as notifier from "./notifier.js";
import * as dateHandler from "./dateHandler.js";
import * as holidayHandler from "./holidayHandler.js";

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
holidayHandler.initHolidays(holidays);
holidayHandler.addInitialHolidays(holidays);

/* 현재 날짜 변수 */
let month, day, hours, minutes, weekday;
let firstDayOfWeek = "월";

const defaultMeeting = {
  weekday: "금",
  hour: 18,
  minute: 0,
  modified: false,
};

const meetingInfo = { ...defaultMeeting };

client.once(Events.ClientReady, (x) => {
  console.log(`${x.user.tag} is ready`);
  client.user.setActivity("동작");

  global.channel = client.channels.cache.get(process.env.CHANNEL_ID);

  let currentDate;
  //TO-DO : 공휴일 추가 구현하기.
  //TO-DO : 화상회의 일자 변경 구현하기.
  //TO-DO : CRON 최적화할 방법 더 알아보기.

  //TO-DO : CRON 로직 시간 기다리지 않고 테스트할 방법 알아보기.
  cron.schedule("* * * * *", () => {
    currentDate = dateHandler.createDate();
    [month, day, hours, minutes, weekday] = getDateValuesFrom(currentDate);

    console.log(`${month}월 ${day}일 ${hours}시 ${minutes}분 ${weekday}요일`);
    scheduler();
  });
});

export function scheduler() {
  
    if (holidays[month][day]){
      return;
    }
    else if (weekday === "토" || weekday === "일") {
      if (meetingInfo.modified === true) {
        meetingInfo = { ...defaultMeeting };
      }
      return;
    }
    else if (isMeetingDay()) {
      if (isTimeToMeet()) {
        notifier.sendMeetingImminentNotification(hours, minutes);
      }
    }

    if (isTimeToBegin()) {
      checkFirstDayOfWeek();
      
      isMeetingDay()
      ? notifier.sendMeetingMorningNotification(currentDate)
      : notifier.sendDailyMorningNotification(currentDate)

    }
}

const isTimeToBegin = () => {
  return hours === 7 && minutes === 30
}

const isTimeToMeet = () => {
  return hours === meetingInfo.hour && minutes === meetingInfo.minute
}

const isMeetingDay = () => {
  return weekday === meetingInfo.weekday
}

const checkFirstDayOfWeek = () => {
  if (weekday === firstDayOfWeek) {
    notifier.sendFirstDayOfWeekNotification();
  }
}

/* 메시지에 답장하는 로직 */
// replier로 옮기기.
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
