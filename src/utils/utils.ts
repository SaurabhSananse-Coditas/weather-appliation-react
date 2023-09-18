/**
 * Get an array of week days starting from the current day.
 *
 * @param {string[]} days - The array to store the week days.
 * @param {number} limitNumOfDays - The number of days to limit the loop.
 * @param {number} today - The current day index (0 for Sunday, 1 for Monday, etc.).
 * @param {number} arraysize - The desired size of the output array.
 * @returns {string[]} An array of week days starting from the current day.
 */
export function getWeekDaysFromCurrentDay(
  days: string[],
  limitNumOfDays: number,
  today: number,
  arraysize: number
) {
  for (; today <= limitNumOfDays; today++) {
    // Check if the desired array size is reached, and if so, return the days.
    if (days.length === arraysize) {
      return days;
    }
    
    // Reset the day index to Sunday if it reaches 7 (Saturday).
    if (today === 7) {
      today = -1;
      // Adjust the limit to the previous day of the current date.
      limitNumOfDays = new Date().getDay() - 1;
      continue; // Skip to the next iteration.
    }
    
    // Push the corresponding day name into the array based on the day index.
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
  
  // Return the array of week days.
  return days;
}
