export function getWeekDaysFromCurrentDay(
    days: string[],
    limitNumOfDays: number,
    today: number,
    arraysize: number
  ) {
    for (; today <= limitNumOfDays; today++) {
      if (days.length === arraysize) {
        return days;
      }
      if (today === 7) {
        today = -1;
        limitNumOfDays = new Date().getDay() - 1;
        continue;
      }
      if (today === 0) {
        days.push('Sunday');
      } else if (today === 1) {
        days.push('Monday');
      } else if (today === 2) {
        days.push('Tuesday');
      } else if (today === 3) {
        days.push('Wednesday');
      } else if (today === 4) {
        days.push('Thursday');
      } else if (today === 5) {
        days.push('Friday');
      } else if (today === 6) {
        days.push('Saturday');
      }
    }
    return days;
  }