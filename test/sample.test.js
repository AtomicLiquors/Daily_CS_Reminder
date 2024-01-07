import {getDateValuesFrom, createDate} from '../src/dateHandler.js'


describe('first test', () => {
    test('sample test code', () => {
       console.log(getDateValuesFrom(createDate()));
    })
})

// 테스트 케이스 0.
// 일반적인 한 주.
// [month, day, hours, minutes, weekday] = getDateValuesFrom(currentDate);

// 테스트 케이스 1.
// 월요일이 공휴일이다. 그리고 주말이 지났다.

// 테스트 케이스 2.
// 월요일도 공휴일이고, 화요일도 공휴일이다. 그리고 주말이 지났다.

