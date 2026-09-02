// src/components/editProductForm/EditProductForm.jsx
import React, { useState, useEffect } from "react";
import { getProduct, updateProduct } from '../../services/productsService';
import './FormProductsEdit.css';

export const EditProductForm = ({ productId, onProductUpdated }) => {
  const [form, setForm] = useState({
    title: "",
    price: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Cargar datos actuales del producto al montar el componente
  useEffect(() => {
    fetch(`https://api.escuelajs.co/api/v1/products/${productId}`)
      .then((res) => res.json())
      .then((data) => {
        setForm({
          title: data.title || "",
          price: data.price || "",
        });
      })
      .catch((err) => setError("No se pudieron cargar los datos del producto"));
  }, [productId]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Convertir el precio a número por si acaso la API lo requiere numérico
      const payload = {
        ...form,
        price: Number(form.price),
      };
      
      const updated = await updateProduct(productId, payload);
      if (onProductUpdated) onProductUpdated(updated);
      alert("¡Producto actualizado con éxito!");
    } catch (err) {
      setError("Hubo un error al guardar los cambios.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="edit-product-form">
      <h3>Modificar Producto</h3>
      {error && <p className="error-message">{error}</p>}
      
      <div>
        <label>Título:</label>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Precio ($):</label>
        <input
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit" disabled={loading}>
        {loading ? "Guardando..." : "Actualizar Producto"}
      </button>
    </form>
  );
};