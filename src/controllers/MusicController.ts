import { type Request, type Response } from 'express'
import { getSongs } from '../models/orm/MusicOrm'

class Controller {
  public getSongs (req: Request, res: Response): void {
    getSongs()
      .then((songs) => res.status(200).json(songs))
      .catch(() => res.status(500))
  }
}

export default Controller
