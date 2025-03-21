export const urlConfig = {
  frontend:
    import.meta.env.MODE === "production"
      ? "https://petarshop.onrender.com"
      : "http://localhost:5173",
  backend:
    import.meta.env.MODE === "production"
      ? "https://backendpetarshop.onrender.com"
      : "http://localhost:4000",
};
