import "../css/SpinLoader.css";

export default function SpinLoader({ isLoading, style }) {
  if (!isLoading) return null;

  return (
    <div className="spin-loader" style={style}>
      <img src="/Loading.gif" alt="Loading..." />
    </div>
  );
}
