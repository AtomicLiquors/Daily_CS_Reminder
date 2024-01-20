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

export const sendAliveMessage = (interaction) => {
  const currentDate = new Date();

  interaction.reply(
    `알림봇이 동작하고 있어요!\n현재 시간 : ${new Intl.DateTimeFormat(
      "ko-KR",
      fullTimeOptions
    ).format(currentDate)}`
  );
};

export const sendInvalidWeekdayMessage = (interaction) => {
  interaction.reply(`[입력 오류] 올바른 요일을 입력해 주세요!`);
};

export const sendInvalidTimeTypeMessage = (interaction) => {
  interaction.reply(`[입력 오류] 올바른 시, 분 값을 입력해 주세요!`);
};

export const sendInvalidTimeRangeMessage = (interaction) => {
  interaction.reply(`[입력 오류] 시, 분의 값 범위가 올바른지 확인해주세요!`);
};

export const sendCurrentMeetingInfoMessage = (interaction, weekday, hour, minute) => {
  interaction.reply(
    `이번 주의 화상회의 일정입니다!\n[ ${weekday}요일 ${hour}시 ${minute}분 ]
    `
  );
}

export const sendScheduleMeetingSuccessfulMessage = (interaction, weekday, hour, minute) => {
  interaction.reply(
    `이번 주 화상회의 일정이 변경되었습니다!\n변경된 일정은 토, 일요일 아침에 초기화되니 주의해주세요.\n\n변경된 일정 : [ ${weekday}요일 ${hour}시 ${minute}분 ]
    `
  );
}
