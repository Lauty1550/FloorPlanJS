export default function ButtonAdd({
  onClick,
  text,
  type,
  className,
  disabled,
}) {
  return (
    <button
      id="botonAdd"
      type={type}
      className={`btn-add-proyecto ${className ? className : ""} ${
        disabled ? "btn-disabled" : ""
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
}
