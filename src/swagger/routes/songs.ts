export default {
  '/songs': {
    get: {
      tags: ['Songs'],
      summary: 'Devuelve la lista de las canciones',
      responses: {
        200: {
          description: 'Devuelve todas las caciones ni errores',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  $ref: '#/components/schemas/Song'
                }
              }
            }
          }
        }
      }
    }
  }

}
