import "./customInput.css";

const CustomInput = ({ label, ...rest }) => {
  return (
    <div>
      <p className="label">{label}</p>
      <input className="sub-input form-control" {...rest} />
    </div>
  );
};

export default CustomInput;
