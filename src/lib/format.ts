export const formatPrice = (value: number) => `$ ${value.toLocaleString("es-AR")}`;

export const normalizeText = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
