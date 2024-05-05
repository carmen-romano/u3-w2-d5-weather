const DayOfWeek = ({ date }) => {
  const options = { weekday: "long" };
  const dayName = new Date(date).toLocaleString("en-US", options);
  const dt_txt = date;
  const timeParts = dt_txt.split(" ")[1].split(":");
  const time = timeParts[0] + ":" + timeParts[1];

  return (
    <span>
      {dayName} {time}
    </span>
  );
};

export default DayOfWeek;
