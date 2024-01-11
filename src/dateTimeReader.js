import * as dateUtil from "./dateUtil.js";
import * as notifier from "./notifier.js";

let month, day, hours, minutes, weekday;
let firstDayOfWeek = "월";

export async function read(currentDate) {

    [month, day, hours, minutes, weekday] = dateUtil.getDateValuesFrom(currentDate);

    console.log(`${month}월 ${day}일 ${hours}시 ${minutes}분 ${weekday}요일`)
  
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
      await runIfFirstDayOfWeek(currentDate);
      
      isMeetingDay()
      ? notifier.sendMeetingMorningNotification(currentDate, hours, minutes)
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

const runIfFirstDayOfWeek = async (currentDate) => {
  if (weekday === firstDayOfWeek) {
    await notifier.sendFirstDayOfWeekNotification(month, getWeeks(currentDate));
  }
}

const getWeeks = (date) => {
    const newDate = new Date(date);
    newDate.setDate(1);

    const firstDay = newDate.getDay();
    const offset = (firstDay + 6) % 7;
    
    
    newDate.setDate(date.getDate());
    const week = Math.floor((date.getDate() + offset - 1) / 7) + 1;
    return week; 
}