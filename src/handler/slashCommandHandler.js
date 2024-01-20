import * as meetingManager from '../manager/meetingManager.js';
import * as slashCommandReplier from '../replier/slashCommandReplier.js';

  const weekdayMap = {
    "월": true,
    "화": true,
    "수": true,
    "목": true,
    "금": true,
    "토": true,
    "일": true,
  };
  

export function handleSlashCommand(interaction){
    const cmd = interaction.commandName;
    
    switch (cmd) {
        case "ruthere":
            handleCheckAlive(interaction);
            break;
        case "schedule-meeting":
            handleScheduleMeeting(interaction);
            break;
        case "current-meeting":
            handleCheckMeetingInfo(interaction);
            break;
        default:
            console.error('invalid command');
    }
}

const handleCheckMeetingInfo = (interaction) => {
  const {weekday, hour, minute} = meetingManager.getMeetingInfo();
  slashCommandReplier.sendCurrentMeetingInfoMessage(interaction, weekday, hour, minute);
}

const handleCheckAlive = (interaction) => {
  slashCommandReplier.sendAliveMessage(interaction);
}
  
const handleScheduleMeeting = (interaction) => {
  const weekdayInput = interaction.options.get('요일').value.trim();

  if(!verifyWeekdayInput(weekdayInput)){
    slashCommandReplier.sendInvalidWeekdayMessage(interaction);
    return;
  }

  const hourInput = interaction.options.get('시').value;
  const minuteInput = interaction.options.get('분').value;

  if(!verifyHourAndMinuteType(hourInput, minuteInput)){
    slashCommandReplier.sendInvalidTimeTypeMessage(interaction);
    return;
  }

  if(!verifyHourAndMinuteRange(hourInput, minuteInput)){
    slashCommandReplier.sendInvalidTimeRangeMessage(interaction);
    return;
  }

  const {weekday, hour, minute} = meetingManager.setMeetingForThisWeek(weekdayInput.trim(), hourInput, minuteInput);
  slashCommandReplier.sendScheduleMeetingSuccessfulMessage(interaction, weekday, hour, minute);
}

const verifyWeekdayInput = (weekdayInput) => {
  return weekdayMap[weekdayInput];
}

const verifyHourAndMinuteType = (hourInput, minuteInput) => {
  return !hourInput.isNan && !minuteInput.isNan;
}

const verifyHourAndMinuteRange = (hourInput, minuteInput) => {
  return (hourInput >= 0 && hourInput < 24 && minuteInput >= 0 && minuteInput < 60)
}