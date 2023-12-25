import { MusicEntity } from '../entities/MusicEntity'
import { type ISong } from '../interfaces/ISong'

export const getSongs = async (): Promise<ISong[]> => {
  const response = await MusicEntity()
    .find()
    .exec()
    .then((res: ISong[]) => res)
  return response
}

export const createSong = async (music: ISong): Promise<ISong> => {
  const response = await MusicEntity()
    .create(music)
    .then((res) => res)
    .catch((err) => err)

  return response
}
