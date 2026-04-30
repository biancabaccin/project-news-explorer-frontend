import "./Preloader.css";

export default function Preloader() {
  return (
    <>
      <div className="preloader">
        <i className="preloader__circle"></i>
        <p className="preloader__text">Procurando notícias...</p>
      </div>
    </>
  );
}
