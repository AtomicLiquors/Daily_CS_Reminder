
import { client } from "../src/setup/clientSetup.js";
import * as holidayUtil from "../src/holidayUtil.js";
import * as dateTimeReader from "../src/dateTimeReader.js"
import {sendFirstDayOfWeekNotification} from "../src/notifier.js"

global.channel = {
  send: (msg) => {
    console.log(msg);
  }
}

const defaultMeeting = {
  weekday: "금",
  hour: 18,
  minute: 0,
  modified: false,
};

global.holidays = [];
global.meetingInfo = { ...defaultMeeting };

holidayUtil.initHolidays(holidays);
holidayUtil.addInitialHolidays(holidays);

describe("일반 테스트", () => {
  test("sample test code", () => {
    sendFirstDayOfWeekNotification();
    // 필요한 매개변수 확인 바람.
  });
});


describe("화상 미팅 아침 테스트", () => {
  test("sample test code", () => {
    dateTimeReader.read(new Date(2024, 0, 12, 7, 30));
  });
});
/*
describe("일반 테스트: 임의 시간", () => {
  test("sample test code", () => {
    dateTimeReader.read(new Date(2024, 0, 9, 18, 0));
  });
});

describe("주차 시작 테스트", () => {
  test("sample test code", () => {
    dateTimeReader.read(new Date(2024, 0, 8, 7, 30));
  });
});


describe("화상 미팅 아침 테스트", () => {
  test("sample test code", () => {
    dateTimeReader.read(new Date(2024, 0, 12, 7, 30));
  });
});

describe("화상 미팅 직전 테스트", () => {
  test("sample test code", () => {
    dateTimeReader.read(new Date(2024, 0, 12, 18, 0));
  });
});
*/