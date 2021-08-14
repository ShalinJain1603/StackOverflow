const date_ob = new Date();

const getDate = () => {
  let date = ("0" + date_ob.getDate()).slice(-2);
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
  let year = date_ob.getFullYear();
  let hours = ("0" + date_ob.getHours()).slice(-2);
  let minutes = date_ob.getMinutes();
  let seconds = date_ob.getSeconds();
  const dateAndTime =
    year +
    "-" +
    month +
    "-" +
    date +
    "T" +
    hours +
    ":" +
    minutes +
    ":" +
    seconds +
    "Z";
  return dateAndTime;
};

module.exports = getDate;
