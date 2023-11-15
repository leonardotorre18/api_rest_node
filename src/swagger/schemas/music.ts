export default {
  Music: {
    type: 'object',
    properties: {
      _id: {
        type: 'string',
        description: 'Identificador único de cada canción'
      },
      title: {
        type: 'string',
        description: 'Título de la canción'
      },
      album: {
        type: 'string',
        description: 'Nombre del album de la canción'
      },
      author: {
        type: 'string',
        description: 'Nombre del autor de la canción'
      },
      duration: {
        type: 'string',
        description: 'Duración de la canción expresada en minutos como cadena de string'
      },
      path: {
        type: 'object',
        properties: {
          front: {
            type: 'string',
            description: 'Dirección http donde se encuentra alojada la imagen de portada de la canción'
          },
          audio: {
            type: 'string',
            description: 'Dirección http donde se encuentra alojado el audio la canción'
          }
        }
      }
    },
    example: {
      _id: { $oid: '63e545d97c383420673552f4' },
      title: 'Mr Blue',
      album: 'Mr Blue',
      duration: '3:03',
      author: 'Catherine Feeny',
      path: {
        audio: 'https://leonardoapi.onrender.com/assets/music/audio/catherinefeeny_mrblue.mp3',
        front: 'https://leonardoapi.onrender.com/assets/music/img/catherinefeeny_mrblue.jpg'
      }
    }

  }
}
