const defaultMeeting = {
    weekday: "금",
    hour: 18,
    minute: 0,
    modified: false,
};

global.meetingInfo = { ...defaultMeeting };
// dateTimeReader가 초마다 읽어와야 하는 문제 때문에 캡슐화하지 않고 글로벌로 보류.

export const getMeetingInfo = () => {
    return {...meetingInfo}
}

export const setMeetingForThisWeek = (weekday, hour, minute) => {
    meetingInfo.weekday = weekday;
    meetingInfo.hour = hour;
    meetingInfo.minute = minute;
    meetingInfo.modified = true;
    return {...meetingInfo};
}

export const setMeetingToDefault = () => {
    meetingInfo = {...defaultMeeting}
}