import { shuffleAndTellOrder } from "./manager/memberOrderManager.js";


function checkChannel(){
    if(!channel) throw new Error("채널을 확인할 수 없습니다.");
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

export async function sendFirstDayOfWeekNotification(month, weeks){
    checkChannel();
    const order = await shuffleAndTellOrder();
    channel.send(
        `🔥 ${month}월 ${weeks}주차 CS 스터디입니다 🔥
        \n- 이번 주의 출제 순서 : 
        \n  [ ${order} ]
        \n- 각 멤버는 이번 주의 발표 주제를 정해주세요!`
      );
}

export function sendTestNotification(){
    checkChannel();
    channel.send(
       `테스트 메시지입니다.`
      );
}
