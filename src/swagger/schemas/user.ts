export default {
  Session: {
    type: 'object',
    properties: {
      token: {
        type: 'string',
        description: 'Token de sesión para autenticación'
      },
      user: {
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
          password: {
            type: 'string',
            description: 'Contraseña del usuario previamente Hasheada'
          }
        },
        example: {
          token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imxlb25hcmRvdG9ycmUxNEBnbWFpbC5jb20iLCJwYXNzd29yZCI6IjEyMzQiLCJpYXQiOjE2OTg2NDE3OTV9.bUIz7liicDJON2dEXjRdv2ynJuGttXASJqrVRraW0GI',
          user: {
            _id: "65272768e36b6baeb9c29f43",
            name: "Leonardo Torrealba",
            email: "leonardotorre14@gmail.com",
            password: "$2b$08$VUN2oTWjABqqWvI1TRi7..bhz.yc2efdFQBoODZ0Nsz2st5HgQXJC",
          }
        }
      }
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
      },
    },
    example: {
      _id: "65272768e36b6baeb9c29f43",
      name: "Leonardo Torrealba",
      email: "leonardotorre14@gmail.com",
    }
  }
}