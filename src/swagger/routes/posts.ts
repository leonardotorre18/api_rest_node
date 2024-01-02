export default {
  '/posts': {
    get: {
      tags: ['Posts'],
      sumary: 'Devuelve la lista completa de los posts ordenados de más reciente a menos reciente',
      parameters: [
        {
          name: 'limit',
          in: 'query',
          required: false,
          description: 'Cantidad de posts en la lista'
        },
        {
          name: 'page',
          in: 'query',
          required: false,
          description: 'Salto de pagina de la lista de posts'
        }
      ],
      responses: {
        200: {
          description: 'La petición fue exitosa',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  limit: {
                    type: 'number',
                    description: 'Cantidad de posts en la lista'
                  },
                  page: {
                    type: 'number',
                    description: 'Salto de pagina de la lista de posts'
                  },
                  posts: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Post'
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    post: {
      tags: ['Posts'],
      sumary: 'Agrega una nueva publicación a la lista'
    }
  }
}
