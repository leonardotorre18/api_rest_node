export default {
  Post: {
    type: 'object',
    properties: {
      _id: {
        type: 'string',
        description: 'Identificador único de cada publicación'
      },
      title: {
        type: 'string',
        description: 'Título de la publicación'
      },
      body: {
        type: 'string',
        description: 'Contenido o cuerpo de la publicación'
      },
      user: {
        $ref: '#/components/schemas/User'
      },
      img: {
        type: 'object',
        properties: {
          url: {
            type: 'string',
            description: 'Dirección http donde se encuentra la imagen alojada'
          },
          id: {
            type: 'string',
            description: 'Identificador público de la imagen'
          }
        }
      }
    },
    example: {
      _id: '6588c47bd39fc68d0cb33c8a',
      img: {
        url: 'http://res.cloudinary.com/dwq3d4e81/image/upload/v1703462010/wjtzedo1wp1kvigweciv.jpg',
        id: 'wjtzedo1wp1kvigweciv'
      },
      body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
      title: 'RockStar Games nos da el primera trailer de GTA VI',
      user: {
        _id: '65272768e36b6baeb9c29f43',
        name: 'Firstname Lastname',
        email: 'user@example.com'
      }
    }
  }
}
