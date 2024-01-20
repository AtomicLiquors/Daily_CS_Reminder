import * as meetingManager from './manager/meetingManager.js';

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
  

export function handleSlashCommand(interaction){
    const cmd = interaction.commandName;
    
    switch (cmd) {
        case 'ruthere':
            sendAliveMessage(interaction);
            break;
        case 'schedule-meeting':
            handleMeetingChange(interaction);
            break;
        case 'current-meeting':
            sendCurrentMeetingInfoMessage(interaction);
            break;
        default:
            console.error('invalid command');
    }
}


const sendAliveMessage = (interaction) => {
    const currentDate = new Date();
  
    interaction.reply(
      `알림봇이 동작하고 있어요!\n현재 시간 : ${new Intl.DateTimeFormat(
        "ko-KR",
        fullTimeOptions
      ).format(currentDate)}`
    );
  }
  
const handleMeetingChange = (interaction) => {
  const weekdayInput = interaction.options.get('요일').trim();
  // 타입 체크 구현할 것.
  const hourInput = interaction.options.get('시');
  const minuteInput = interaction.options.get('분');

  const [weekday, hour, minute] = meetingManager.setMeetingForThisWeek(weekdayInput, hourInput, minuteInput);

  interaction.reply(
    `이번 주 화상회의 일정이 변경되었습니다!\n
      변경된 일정 : ${weekday}요일 ${hour}시 ${minute}분
    `
  );
}

const sendCurrentMeetingInfoMessage = (interaction) => {
  const [weekday, hour, minute] = meetingManager.getMeetingInfo();

  interaction.reply(
    `이번 주의 화상회의 일정입니다!\n
      ${weekday}요일 ${hour}시 ${minute}분
    `
  );
}
