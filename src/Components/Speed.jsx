const Speed = ({ speed }) => {
  const convertKm = kmSecond => {
    return (kmSecond * 3.6).toFixed(2);
  };

  return <>{convertKm(speed)} km/h</>;
};

export default Speed;
