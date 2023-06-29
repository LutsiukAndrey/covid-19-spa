import dayjs from 'dayjs';

export const generateDateRange = (dateFrom, dateTo) => {
  const arr = [];
  if (dateFrom && dateTo) {
    const startDate = dayjs(dateFrom, 'YYYY-MM-DD');
    const endDate = dayjs(dateTo, 'YYYY-MM-DD');
    let currentDate = startDate;

    while (currentDate.isBefore(endDate) || currentDate.isSame(endDate)) {
      arr.push(currentDate.format('YYYY-MM-DD'));
      currentDate = currentDate.add(1, 'day');
    }
  }
  return arr;
};
