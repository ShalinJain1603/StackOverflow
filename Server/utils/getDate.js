const getDate = () => {
  const currentTime = new Date();
  const currentOffset = currentTime.getTimezoneOffset();
  const ISTOffset = 330;
  const ISTTime = new Date(
    currentTime.getTime() + (ISTOffset + currentOffset) * 60000
  );
  return ISTTime;
};

module.exports = getDate;
