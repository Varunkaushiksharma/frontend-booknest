import "./Button.css";

function Button({
  name,
  children,
  onClick,
  type = "button",
  className = ""
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`butn ${className}`}
    >
      {children ? children : name}
    </button>
  );
}

export default Button;
