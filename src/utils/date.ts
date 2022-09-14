export const parseDate = (date: string) => {
  const result = /^(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/.exec(date);

  if (!result) {
    throw new Error("Wrong input date format. Should be yyyy-MM-dd HH:mm:ss");
  }

  return new Date(
    +result[1],
    +result[2] - 1,
    +result[3],
    +result[4],
    +result[5],
    +result[6]
  );
};

export const formatDate = (date: Date) => {
  const dateString = [
    date.getDate().toString().padStart(2, "0"),
    (date.getMonth() + 1).toString().padStart(2, "0"),
    date.getFullYear(),
  ].join("/");

  const timeString = [
    date.getHours().toString().padStart(2, "0"),
    date.getMinutes().toString().padStart(2, "0"),
    date.getSeconds().toString().padStart(2, "0"),
  ].join(":");

  return `${timeString} ${dateString}`;
};
