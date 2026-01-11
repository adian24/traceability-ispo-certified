import "./button.css";

const Button = ({ title, background, color, border, width, ...rest }) => {
  return (
    <button className="button" {...rest} style={{ background, border, width }}>
      <p className="text-button" style={{ color }}>
        {title}
      </p>
    </button>
  );
};

export default Button;
