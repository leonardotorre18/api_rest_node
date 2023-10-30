export default {
  '/social/login': {
    post: {
      tags: ['Social'],
      summary: 'Inicio de sesión de un usuario registrado',
      requestBody: {
        require: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                email: {
                  type: 'string',
                  description: 'Email del usuario registrador previamente en la base de datos'
                },
                password: {
                  type: 'string',
                  description: 'Contraseña del usuario correspondiente a la cuenta asociada al Email'
                }
              }
            },
            example: {
              email: 'Leonardotorre14@gmail.com',
              password: '1234'
            }
          }
        }
      },
      responses: {
        '200': {
          description: 'El inicio de sesión se ha realizado con éxito',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Session'
              }
            }
          },
        }
      }
    }
  },
  '/social/users': {
    get: {
      security:{
        BearerAuth: ['BearerAuth']
      },
      tags: ['Social'],
      summary: 'Regresa todos los usuario guardados en la base de datos',
      responses: {
        '200': {
          description: 'La petición fue exitosa',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  $ref: '#/components/schemas/User'
                }
              }
            }
          }
        }
      }
    }
  }
}