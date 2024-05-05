const TimeZone = ({ time }) => {
  const oraLocale = time / 3600;
  const sign = oraLocale >= 0 ? "+" : "-";

  return (
    <h3 className="fw-bold">
      Time zone {sign} {oraLocale}
    </h3>
  );
};

export default TimeZone;
