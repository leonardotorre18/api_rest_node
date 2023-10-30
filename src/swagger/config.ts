import musicRoutes from "./routes/music";
import musicComponent from "./schemas/music";

export default {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "LeonardoApi",
      version: "2.0.0",
      description: "Creada con fines didácticos para estudiantes del Instituto  Alfa Carabobo",
    },
    servers: [
      {
        url: "http://localhost:3001",
      },{
        url: "https://leonardoapi.onrender.com/",
      },
    ],
    tags: [
      { name: 'Music', description: 'Simulación de un reproductor de música' }
    ],
    components: {
      schemas: {
        ...musicComponent
      }
    },
    paths: {
      ...musicRoutes
    }
  },
  apis: ["./src/routes/*.ts"],
};

// /**
//  * @swagger
//  * components:
//  *  securityScheme:
//  *    bearerAuh:
//  *      type: http
//  *      scheme: bearer
//  *      bearerFormat: JWT
//  */

//  *    headers:
//  *      - name: Authorization
//  *        required: true
//  *        schema:
//  *          type: string
//  *          description: Token de autenticación Bearer
// /**
//  * @swagger
//  * /social/login/{user}:
//  *  post:
//  *    summary: Ruta de inicio de sesión
//  *    tags: [Social]
//  *    security:
//  *      - bearerAuth: [bearerAuh]
//  *    parameters:
//  *      - user:
//  *        in: path
//  *        name: user
//  *        required: true
//  *        schema:
//  *          type: string
//  *        description: Naaaaa
//  *    requestBody:
//  *      required: true
//  *      content:
//  *        application/json:
//  *          schema:
//  *            type: object
//  *            properties:
//  *              name: 
//  *                type: string
//  *                description: de prueba
//  *    responses:
//  *      200:
//  *        description: Inicio de sesión exitoso
//  *        content:
//  *          application/json:
//  *            schema:
//  *              type: object
//  *              properties:
//  *                _id: 
//  *                  type: string
//  *                  description: Identificador Único
//  */