export const getDateInMMDDYYYY = (dateString) => {
  let datetime = new Date(dateString);
  let date = datetime.getDate();
  let month = datetime.getMonth();
  let formattedMonth = month < 9 ? "0" + (month + 1) : month + 1;
  let year = datetime.getFullYear();

  let formattedFullDate = formattedMonth + "/" + date + "/" + year;

  return formattedFullDate;
};
