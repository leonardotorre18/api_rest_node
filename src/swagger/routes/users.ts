export default {
  '/users/login': {
    post: {
      tags: ['Users'],
      summary: 'Inicio de sesión de un usuario registrado',
      requestBody: {
        require: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                email: {
                  type: 'string'
                },
                password: {
                  type: 'string'
                }
              }
            },
            example: {
              email: 'user@example.com',
              password: '123456789'
            }
          }
        }
      },
      responses: {
        200: {
          description: 'El inicio de sesión se ha realizado con éxito',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  user: {
                    $ref: '#/components/schemas/Session'
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  '/users/register': {
    post: {
      tags: ['Users'],
      summary: 'Guarda un usuario no registrado en la base de datos',
      requestBody: {
        require: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                email: {
                  type: 'string'
                },
                password: {
                  type: 'string'
                },
                name: {
                  type: 'string'
                }
              }
            },
            example: {
              name: 'Firstname Lastname',
              email: 'user@example.com',
              password: '123456789'
            }
          }
        }
      },
      responses: {
        201: {
          description: 'La petición fue exitosa',
          content: {
            'application/json': {
              schema: {
                object: 'object',
                properties: {
                  user: {
                    $ref: '#/components/schemas/Session'
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  '/users': {
    get: {
      tags: ['Users'],
      summary: 'Regresa todos los usuario guardados en la base de datos',
      responses: {
        200: {
          description: 'La petición fue exitosa',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  users: {
                    type: 'array',
                    description: 'Lista de usuarios',
                    items: {
                      $ref: '#/components/schemas/User'
                    }
                  }
                }
                // example: {
                //   users: [
                //     {
                //       _id: '65272768e36b6baeb9c29f43',
                //       name: 'Firstname Lastname',
                //       email: 'user@example.com'
                //     }
                //   ]
                // }
              }
            }
          }
        }
      }
    }
    // get: {
    //   tags: ['Users'],
    //   summary: 'Regresa todos los usuario guardados en la base de datos',
    //   security: [
    //     { BearerAuth: ['BearerAuth'] }
    //   ],
    //   responses: {
    //     200: {
    //       description: 'La petición fue exitosa',
    //       content: {
    //         'application/json': {
    //           schema: {
    //             type: 'array',
    //             items: {
    //               $ref: '#/components/schemas/User'
    //             }
    //           }
    //         }
    //       }
    //     }
    //   }
    // }
  }
}
