import dayjs from 'dayjs';

const generateDateRange = (dateFrom, dateTo) => {
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

const generateLastMonth = () => {
  const arr = [];
  const startDate = dayjs('2020-01-22', 'YYYY-MM-DD');
  const endDate = dayjs();
  let currentDate = startDate;

  while (currentDate.isBefore(endDate) || currentDate.isSame(endDate)) {
    arr.push(currentDate.format('YYYY-MM-DD'));
    currentDate = currentDate.add(1, 'day');
  }

  return arr;
};

export default {
  generateDateRange,
  generateLastMonth,
};
