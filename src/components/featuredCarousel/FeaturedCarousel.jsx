import { useState, useEffect } from "react";
import {
  getVisibleProducts,
  productPrice,
  resolveProductImage,
} from "../../services/productsService";
import "./FeaturedCarousel.css";

function ProductImage({ src, alt }) {
  const [prevSrc, setPrevSrc] = useState(src);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  if (prevSrc !== src) {
    setPrevSrc(src);
    setIsLoaded(false);
    setHasError(false);
  }

  const imageSource = hasError
    ? "https://picsum.photos/seed/fallback/600/600"
    : src;

  return (
    <>
      {!isLoaded && (
        <div className="productImagePlaceholder" aria-hidden="true">
          ...
        </div>
      )}
      <img
        src={imageSource}
        alt={alt}
        className="productImage"
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
      />
    </>
  );
}

const FeaturedCarousel = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let ignore = false;

    const loadProducts = async () => {
      try {
        const visible = await getVisibleProducts();
        const topFive = [...visible]
          .sort((a, b) => productPrice(b) - productPrice(a))
          .slice(0, 5);
        if (!ignore) setProducts(topFive);
      } catch (error) {
        console.error("No se pudo cargar el inventario", error);
        if (!ignore) setHasError(true);
      } finally {
        if (!ignore) setIsLoading(false);
      }
    };

    loadProducts();
    return () => {
      ignore = true;
    };
  }, []);

  if (isLoading) {
    return <div className="loadingText">CARGANDO NODOS DE DATOS...</div>;
  }

  if (hasError || products.length === 0) {
    return <div className="loadingText">INVENTARIO NO DISPONIBLE.</div>;
  }

  return (
    <section className="carouselContainer" aria-labelledby="featuredTitle">
      <div className="carouselHeader">
        <div>
          <p className="sectionKicker">MERCADO // TRANSMISIÓN 04</p>
          <h2 id="featuredTitle">BOTÍN DESTACADO</h2>
        </div>
        <span className="syncStatus">TOP 5 DEL INVENTARIO</span>
      </div>

      <div className="featuredGrid">
        {products.map((product, index) => {
          const title =
            String(product?.title ?? "").trim() || "Artefacto desconocido";
          const category =
            String(product?.category?.name ?? "").trim() || "DESCONOCIDA";
          const src = resolveProductImage(product);

          return (
            <article className="productCard" key={product?.id ?? index}>
              <div className="productImageFrame">
                <ProductImage src={src} alt={title} />
                <span className="productCondition">DISPONIBLE</span>
                <span className="productRank">
                  #{String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="productInfo">
                <div className="productMeta">
                  <span>{category}</span>
                  <span>STOCK 1</span>
                </div>
                <h3 className="productTitle">{title}</h3>
                <div className="productBottomLine">
                  <p className="productPrice">
                    {productPrice(product).toLocaleString("es-ES")} CR
                  </p>
                  <button type="button" className="buyButton">
                    AÑADIR
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default FeaturedCarousel;
