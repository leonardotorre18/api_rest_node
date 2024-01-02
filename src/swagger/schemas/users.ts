export default {
  Session: {
    type: 'object',
    properties: {
      _id: {
        type: 'string',
        description: 'Identificador único del usuario'
      },
      name: {
        type: 'string',
        description: 'Nombre del usuario'
      },
      email: {
        type: 'string',
        description: 'Email del usuario con el cual se registró. Único en la base de datos'
      },
      token: {
        type: 'string',
        description: 'Token de sesión para autenticación'
      }
    },
    example: {
      _id: '65272768e36b6baeb9c29f43',
      name: 'Firstname Lastname',
      email: 'user@example.com',
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imxlb25hcmRvdG9ycmUxNEBnbWFpbC5jb20iLCJwYXNzd29yZCI6IjEyMzQiLCJpYXQiOjE2OTg2NDE3OTV9.bUIz7liicDJON2dEXjRdv2ynJuGttXASJqrVRraW0GI'
    }
  },
  User: {
    type: 'object',
    properties: {
      _id: {
        type: 'string',
        description: 'Identificador único del usuario'
      },
      name: {
        type: 'string',
        description: 'Nombre del usuario'
      },
      email: {
        type: 'string',
        description: 'Email del usuario con el cual se registró. Único en la base de datos'
      }
    },
    example: {
      _id: '65272768e36b6baeb9c29f43',
      name: 'Firstname Lastname',
      email: 'user@example.com'
    }
  }
}
