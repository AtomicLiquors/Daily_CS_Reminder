export function initHolidays(holidays) {
  for (let i = 1; i <= 12; i++) {
    holidays[i] = [];
  }
}

export function addInitialHolidays(holidays) {
  holidays[1][1] =
    "☀️2024년 새해가 밝았습니다!☀️\n새해에도 다함께 파이팅! 🎉🎉";
  holidays[2][9] = "🎊오늘은 설 연휴 시작입니다.🎊\n즐거운 명절 되세요!";
  holidays[3][1] = "오늘은 삼일절입니다. CS 스터디는 쉽니다!";
}
