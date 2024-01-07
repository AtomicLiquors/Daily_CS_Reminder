function checkChannel(){
    if(!channel) return;
} 

export function sendDailyMorningNotification(date){
    checkChannel();
    channel.send(
    `${date.toLocaleString(
        "ko-KR"
    )}\n오늘의 CS 퀴즈를 출제해주세요!`
    );
}

export function sendMeetingMorningNotification(date, hours, minutes){
    checkChannel();
    channel.send(
        `${date.toLocaleString(
          "ko-KR"
        )}
        \n오늘은 화상회의 날입니다.
        \n발표, 퀴즈를 준비해 주시고
        \n${hours}시 ${minutes}분에 만나요!`
      );
}

export function sendMeetingImminentNotification(hours, minutes){
    checkChannel();
    channel.send(
        `${hours}시 ${minutes}분입니다.
        \n음성 채널로 접속해 주세요!`
      );
}

export function sendFirstDayOfWeekNotification(){
    checkChannel();
    channel.send(
        `이번 주의 출제 순서를 정해주세요!
        \n이번 주의 발표 주제를 정해주세요!`
      );
}
