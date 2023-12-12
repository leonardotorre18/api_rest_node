// import data from '../json/music.json'
import { MusicResponse200 } from './types/responses'
import { getAllMusics } from '../models/orm/MusicOrm'
import { type TServerResponse } from './types'

class Controller {
  public async getAllData (): Promise<TServerResponse> {
    const response = await getAllMusics()
    return MusicResponse200(response)
  }

  // public getDataById (id: string): Music[] {
  //   const response = data.filter(item => item._id.$oid === id)
  //   return response
  // }
}

export default Controller
