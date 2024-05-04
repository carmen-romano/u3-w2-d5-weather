const TimeZone = ({ time }) => {
  const oraLocale = time / 3600;

  return <h3 className="fw-bold"> Time zone + {oraLocale}</h3>;
};

export default TimeZone;
