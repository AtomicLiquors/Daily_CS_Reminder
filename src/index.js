import * as holidayUtil from "./holidayUtil.js";
import * as dateUtil from "./dateUtil.js";
import * as dateTimeReader from "./dateTimeReader.js";
import { client } from "./setup/clientSetup.js";
import { setSlashCommands } from "./setup/slashCommandSetup.js"

import express from "express";
import cron from "node-cron";
import dotenv from "dotenv";
dotenv.config();

import { Events } from "discord.js";
import { handleSlashCommand } from "./handler/slashCommandHandler.js";

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
global.meetingInfo = {
    weekday: "금",
    hour: 18,
    minute: 0,
    modified: false,
};
holidayUtil.initHolidays(holidays);
holidayUtil.addInitialHolidays(holidays);


const task = cron.schedule("* * * * *", () => {
  let currentDate = dateUtil.createDate();
  dateTimeReader.read(currentDate);
}, {
  timezone: "Asia/Seoul"
});

client.once(Events.ClientReady, (x) => {
  console.log(`${x.user.tag} is ready`);
  client.user.setActivity("동작");

  global.channel = client.channels.cache.get(process.env.CHANNEL_ID);

  setSlashCommands();
  
  //TO-DO : 공휴일 추가 구현하기.
  //TO-DO : CRON 최적화할 방법 더 알아보기.
  task.start();
});

const rest = (time) => {
  task.stop();
  setTimeout(() => {
    task.start();
  }, time)
}

client.on(Events.InteractionCreate, (interaction) =>{
  if(!interaction.isChatInputCommand()) return;

  handleSlashCommand(interaction);
})

/* 메시지에 답장하는 로직 */
/*
client.on(Events.MessageCreate, (msg) => {
  if (msg.author.bot) return;
  if (msg.content === "") {
    
    msg.channel.send(
    );
  }
});
*/
/*
client.on(Events.GuildMemberAdd, (x) => {
  channel.send(
    '새 멤버가 추가되었습니다! 관련 로직을 구현해주세요.'
  );
  console.log(x);
})
*/
client.login(process.env.DISCORD_BOT_ID);
