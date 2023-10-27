export default {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "TLeonardoApi",
      version: "2.0.0",
      description: "Creada con fines didácticos para estudiantes del Instituto  Alfa Carabobo",
    },
    servers: [
      {
        url: "http://localhost:3001",
      },{
        url: "https://leonardoapi.onrender/",
      },
    ],
  },
  apis: ["./src/routes/*.ts"],
};