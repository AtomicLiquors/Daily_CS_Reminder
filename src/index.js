
import * as holidayUtil from "./holidayUtil.js";
import * as dateTimeReader from "./dateTimeReader.js";

import express from "express";
import cron from "node-cron";
import dotenv from 'dotenv';
dotenv.config();

//import pkg from "discord.js"
import {
  Client,
  GatewayIntentBits,
  Events,
  /*EmbedBuilder,
  PermissionsBitField,
  Permissions,*/
} from 'discord.js';


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
global.holidays = [];
holidayUtil.initHolidays(holidays);
holidayUtil.addInitialHolidays(holidays);


const defaultMeeting = {
  weekday: "금",
  hour: 18,
  minute: 0,
  modified: false,
};

global.meetingInfo = { ...defaultMeeting };

client.once(Events.ClientReady, (x) => {
  console.log(`${x.user.tag} is ready`);
  client.user.setActivity("동작");

  global.channel = client.channels.cache.get(process.env.CHANNEL_ID);

  //TO-DO : 공휴일 추가 구현하기.
  //TO-DO : 화상회의 일자 변경 구현하기.
  //TO-DO : CRON 최적화할 방법 더 알아보기.

  cron.schedule("* * * * *", () => {
    dateTimeReader.read(dateHandler.createDate());
  });
});

/* 메시지에 답장하는 로직 */
// replier로 옮기기.
client.on(Events.MessageCreate, (msg) => {
  if (msg.author.bot) return;
  if (msg.content === "RUTHERE") {
    let currentDate = new Date();

    msg.channel.send(
      `알림봇이 동작하고 있어요!\n현재 시간 : ${new Intl.DateTimeFormat(
        "ko-KR",
        fullTimeOptions
      ).format(currentDate)}`
    );
  }
});

client.login(process.env.DISCORD_BOT_ID);
