import songsRoutes from './routes/songs'
import usersRoutes from './routes/users'
import postsRoutes from './routes/posts'
import songsSchema from './schemas/songs'
import usersSchema from './schemas/users'
import postsSchema from './schemas/posts'

import dotenv from 'dotenv'

dotenv.config()
const PORT: number | string = process.env.PORT ?? 3000

export default {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'LeonardoApi',
      version: '2.0.0',
      description: 'Creada con fines didácticos para estudiantes del Instituto  Alfa Carabobo'
    },
    servers: [
      {
        url: 'https://leonardoapi.onrender.com/'
      }, {
        url: `http://localhost:${PORT}`
      }
    ],
    tags: [
      { name: 'Songs', description: 'Endpoints de un reproductor de música' },
      { name: 'Users', description: 'Endpoints para registo y sesión de usuarios' },
      { name: 'Posts', description: 'Endpoints para posts generados por usuarios' }
      // { name: 'Movies', description: 'Sumulación de una página de cines' }
    ],
    components: {
      schemas: {
        ...songsSchema,
        ...usersSchema,
        ...postsSchema
      },
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    paths: {
      ...songsRoutes,
      ...usersRoutes,
      ...postsRoutes
    }
  },
  apis: ['./src/routes/*.ts']
}

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
