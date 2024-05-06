const VisibilityCalc = ({ distance }) => {
  let visibility = distance.toFixed(2);
  console.log(visibility);

  if (visibility >= 10000) {
    visibility = "> 10";
  } else visibility = "< 10";

  return (
    <div>
      <p className="fw-bold">
        <i className="fas fa-eye mx-2"></i>Visibility {visibility} kilometers
      </p>
    </div>
  );
};

export default VisibilityCalc;
