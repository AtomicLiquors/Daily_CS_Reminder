//To-Do : "서버 위치에 따라 시차 유동적으로 바꿀 것.
const utcOffsetHours = 9;

const weekday = {
    0: "일",
    1: "월",
    2: "화",
    3: "수",
    4: "목",
    5: "금",
    6: "토"
}

export function createDate(){
    const date = new Date();
    date.setHours(date.getHours() + utcOffsetHours);
    return date;
}

export function getDateValuesFrom(date){
    return [
      date.getMonth() + 1,
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      weekday[date.getDay()]
    ];
  }
  