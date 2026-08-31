import "./HeroSection.css";
import apocalypseImage from "../../../assets/img/apocalypse.jpg";

const HeroSection = () => {
  return (
    <section
      className="heroWrapper"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.85)), url(${apocalypseImage})`,
      }}
    >
      <div className="heroContent">
        <div className="badgeOnline"><span /> SISTEMA EN LÍNEA</div>
        <h1 className="mainTitle">
          <span>RECOLECTA.</span>
          <span>SOBREVIVE.</span>
          <span>DOMINA.</span>
        </h1>
      <p className="heroDescription">
        Bienvenido al vertedero central. Aquí solo sobrevive el más apto y la
        mejor chatarra se cotiza en plomo y agua. Revisa el inventario antes de
        que los saqueadores se lo lleven todo.
      </p>
      <div className="actionGroup">
        <button type="button" className="primaryButton">EXPLORAR INVENTARIO <b>→</b></button>
        <button type="button" className="secondaryButton">VER MAPA SECTORIAL <b>↗</b></button>
      </div>
      </div>
    </section>
  );
};

export default HeroSection;
