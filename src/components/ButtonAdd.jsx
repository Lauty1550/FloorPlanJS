export default function ButtonAdd({ onClick, text, type, className }) {
  return (
    <button
      id="botonAdd"
      type={type}
      className={`btn-add-proyecto ${className ? className : ""}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
