const Temperature = ({ kelvin }) => {
  const celsiusTemperature = (kelvin - 273.15).toFixed(2);

  return (
    <>
      {celsiusTemperature} <span>°C</span>
    </>
  );
};

export default Temperature;
