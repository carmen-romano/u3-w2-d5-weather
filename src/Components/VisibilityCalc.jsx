const VisibilityCalc = ({ distance }) => {
  let visibility = distance.toFixed(2);

  if (visibility >= 10000) {
    visibility = ">10";
  }

  return (
    <div>
      <p className="fw-bold">Visibility {visibility} kilometers</p>
    </div>
  );
};

export default VisibilityCalc;
