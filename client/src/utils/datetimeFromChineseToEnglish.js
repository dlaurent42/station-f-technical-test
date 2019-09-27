const dayAbbreviation = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const dayList = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const monthList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
  'Oct', 'Nov', 'Dec'];
const monthLongList = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'];

export default {
  formatDisplay: date => `${dayList[date.getDay()]}, ${monthList[date.getMonth()]} ${date.getDate()}`,
  formatMonth: date => `${monthLongList[date.getMonth()]} ${date.getFullYear()}`,
  getWeekDayArray: (firstDayOfWeek) => {
    const beforeArray = [];
    const afterArray = [];
    for (let i = 0; i < dayAbbreviation.length; i += 1) {
      if (i < firstDayOfWeek) afterArray.push(dayAbbreviation[i]);
      else beforeArray.push(dayAbbreviation[i]);
    }
    return beforeArray.concat(afterArray);
  },
  getMonthList: () => monthList,
};
