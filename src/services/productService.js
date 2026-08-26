export const fetchHighestPriceProducts = async () => {
  const mockApiResponse = [
    {
      id: 1,
      name: "Núcleo de Fusión Estable",
      price: 4500,
      category: "ENERGÍA",
      stock: 2,
      condition: "RECUPERADO",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=700&q=80",
    },
    {
      id: 2,
      name: "Purificador de Agua Grado III",
      price: 3200,
      category: "SUPERVIVENCIA",
      stock: 6,
      condition: "REVISADO",
      image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=700&q=80",
    },
    {
      id: 3,
      name: "Placa de Blindaje Mk-V",
      price: 2800,
      category: "DEFENSA",
      stock: 4,
      condition: "FUNCIONAL",
      image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=700&q=80",
    },
    {
      id: 4,
      name: "Batería de Calor Residual",
      price: 1900,
      category: "ENERGÍA",
      stock: 9,
      condition: "REVISADO",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=700&q=80",
    },
    {
      id: 5,
      name: "Escáner Térmico Oxidado",
      price: 1500,
      category: "RASTREO",
      stock: 3,
      condition: "INCIERTO",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=700&q=80",
    },
  ];

  return mockApiResponse.sort((productA, productB) => productB.price - productA.price);
};