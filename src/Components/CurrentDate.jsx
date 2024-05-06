const CurrentDate = ({ timezoneOffset }) => {
  const now = new Date();

  const adjustedTime = new Date(
    now.getTime() + timezoneOffset * 60 * 60 * 1000
  );

  const localTime = new Date(
    adjustedTime.getTime() + now.getTimezoneOffset() * 60 * 1000
  );

  const options = { weekday: "long", hour: "numeric", minute: "numeric" };
  const currentTime = localTime.toLocaleTimeString("en-US", options);

  return <p className="fw-bold">{currentTime}</p>;
};
export default CurrentDate;
