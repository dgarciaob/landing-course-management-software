export const formatPrice = (price: number) => {
  return new Intl.NumberFormat("es-PE", {
    // "es-US"
    style: "currency",
    currency: "PEN", // "USD"
  }).format(price);
};
