import moment from "moment";

export const parseFetchedData = (responseData) => {
  try {
    const { posts, continuationtoken } = responseData.responseobjects[0];
    return {
      posts: posts || [],
      postsMap: convertArrayToMap(posts, "calendardatetime"),
      continuationToken: continuationtoken
    };
  } catch (err) {
    console.error(err.message);
    throw err;
  }
};

export const convertArrayToMap = (arr, key) => {
  if (!arr || !arr.length) return null;

  const arrToMap = arr.reduce((objAcc, item) => {
    const formattedDatetime = moment(item[key]).format("YYYY-MM-DD");
    objAcc[formattedDatetime] = item;
    return objAcc;
  }, {});

  return arrToMap;
};

export const truncate = (str) => {
  if (str.length <= 140) return str;
  return str.slice(0, 140) + "...";
};

export const getTodayDateTime = () => {
  const now = moment();

  const date = now.date(); // 1-31
  const month = now.month(); // Jan -> 0 ... Dec -> 11
  const year = now.year(); // YYYY
  const day = now.day(); // Sunday -> 0 ... Saturday -> 6

  return {
    date,
    month,
    year,
    day
  };
};

export const getCurrentTileDate = (rowIndex, columnIndex) => {
  // NOTE: beginning from 28/12/1969 (Sunday)

  const currentDate = moment(0)
    .weekday(0)
    .add(rowIndex, "week")
    .add(columnIndex, "day");

  // console.log(currentDate.format("ddd, Do MMM YYYY"));

  return currentDate;
};

export const isNewMonthSunday = (date) => {
  const currentDate = moment(date);
  const currentWeekSaturday = moment(date).weekday(6);

  const result =
    currentDate.date() > currentWeekSaturday.date() &&
    (currentDate.month() < currentWeekSaturday.month() ||
      (currentDate.month() === 11 &&
        currentDate.month() > currentWeekSaturday.month()));

  return result;
};
