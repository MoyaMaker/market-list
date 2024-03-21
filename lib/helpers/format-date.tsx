export const formatDate = (d: string) => {
  const date = new Date(d);

  return date.toLocaleDateString("es-MX", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};
