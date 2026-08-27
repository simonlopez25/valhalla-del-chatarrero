import { useState, useEffect } from "react";
import { fetchHighestPriceProducts } from "../../services/productService";
import "./FeaturedCarousel.css";

const FeaturedCarousel = () => {
  const [highestPriceProducts, setHighestPriceProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const productsData = await fetchHighestPriceProducts();
        setHighestPriceProducts(productsData);
      } catch (error) {
        console.error("No se pudo cargar el inventario", error);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  const handleNextSlide = () => {
    setCurrentIndex((prevIndex) =>
      highestPriceProducts.length
        ? (prevIndex + 1) % highestPriceProducts.length
        : 0,
    );
  };

  const handlePrevSlide = () => {
    setCurrentIndex((prevIndex) =>
      highestPriceProducts.length
        ? prevIndex === 0
          ? highestPriceProducts.length - 1
          : prevIndex - 1
        : 0,
    );
  };

  if (isLoading) {
    return <div className="loadingText">CARGANDO NODOS DE DATOS...</div>;
  }

  if (hasError || highestPriceProducts.length === 0) {
    return <div className="loadingText">INVENTARIO NO DISPONIBLE.</div>;
  }

  return (
    <section className="carouselContainer" aria-labelledby="featured-title">
      <div className="carouselHeader">
        <div>
          <p className="sectionKicker">MERCADO // TRANSMISIÓN 04</p>
          <h2 id="featured-title">BOTÍN DESTACADO</h2>
        </div>
        <span className="syncStatus">
          NODO ACTIVO [{String(currentIndex + 1).padStart(2, "0")} /
          {String(highestPriceProducts.length).padStart(2, "0")}]
        </span>
      </div>

      <div className="carouselControls">
        <button
          type="button"
          onClick={handlePrevSlide}
          className="controlButton"
          aria-label="Producto anterior"
        >
          ←
        </button>

        <div className="cardTrack">
          {[0, 1, 2].map((offset) => {
            const product =
              highestPriceProducts[
                (currentIndex + offset) % highestPriceProducts.length
              ];

            return (
              <article className="productCard" key={`${product.id}-${offset}`}>
                <div className="productImageFrame">
                  <img src={product.image} alt={product.name} className="productImage" />
                  <span className="productCondition">{product.condition}</span>
                </div>
                <div className="productInfo">
                  <div className="productMeta">
                    <span>{product.category}</span>
                    <span>STOCK {product.stock}</span>
                  </div>
                  <h3 className="productTitle">{product.name}</h3>
                  <div className="productBottomLine">
                    <p className="productPrice">{product.price.toLocaleString("es-ES")} CR</p>
                    <button type="button" className="buyButton">AÑADIR</button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <button
          type="button"
          onClick={handleNextSlide}
          className="controlButton"
          aria-label="Producto siguiente"
        >
          →
        </button>
      </div>
    </section>
  );
};

export default FeaturedCarousel;
