const SunsetAndSunrise = ({ time }) => {
  const formatTime = time => {
    const date = new Date(time * 1000);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours}:${minutes < 10 ? "0" + minutes : minutes}`;
  };

  const timeTot = formatTime(time);

  return <>{timeTot}</>;
};

export default SunsetAndSunrise;
