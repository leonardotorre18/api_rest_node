import express from 'express'
import musicController from '../controllers/MusicController'

const router: express.Router = express.Router()
const controller: any = new musicController()

router.route('/')

  .get((req: express.Request, res: express.Response) => {
    const { id } = req?.query
    let data = []

    if (id !== undefined) data = controller.getDataById(id)
    else data = controller.getAllData()

    res.json(data).status(200)
  })

export default router
