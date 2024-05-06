import CurrentDate from "./CurrentDate";

const TimeZone = ({ time }) => {
  const oraLocale = time / 3600;
  const sign = oraLocale >= 0 ? "+" : "";

  return (
    <>
      <h3>
        <CurrentDate timezoneOffset={oraLocale} />
        <i className="fas fa-history fs-4 mx-2"></i> {sign} {oraLocale}
      </h3>
    </>
  );
};

export default TimeZone;
