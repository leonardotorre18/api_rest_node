import express, { Request, Response, Router } from "express";
import musicController from "../controllers/MusicController";

const router: Router = express.Router()
const controller: any = new musicController()

/**
 * @swagger
 * components:
 *  schemas:
 *    Music:
 *      type: object
 *      properties:
 *        _id:
 *          type: string
 *          description: Identificador único de cada canción
 *        title:
 *          type: string
 *          description: Título de la cación
 *        album:
 *          type: string
 *          description: Nombre del album al que pertenece la cación
 *        author:
 *          type: string
 *          description:  Autor de la canción
 *        duration:
 *          type: string
 *          description: Duración de la canción
 *        path:
 *          type: object
 *          properties:
 *            front:
 *              type: string
 *              description: Dirección URL donde se encuentra alojada la portada la canción
 *            audio:
 *              type: string
 *              description: Dirección URL donde se encuentra alojada el audio la canción
 *      example:
 *        id: 63e545d97c383420673552f4
 *        title: Mr Blue
 *        album: Mr Blue
 *        duration: 3:03
 *        author: Catherine Feeny
 *        path: 
 *          audio: https://leonardoapi.onrender.com/assets/music/audio/catherinefeeny_mrblue.mp3
 *          front: https://leonardoapi.onrender.com/assets/music/img/catherinefeeny_mrblue.jpg
 * 
 * 
//  *  parameters:
//  *    taskId:
//  *      in: path
//  *      name: id
//  *      required: true
//  *      schema:
//  *        type: string
//  *      description: the task id
 */

/**
 * @swagger
 * tags:
 *  name: Music
//  *  description: Lista de canciones para un reproductor de música
 */

router.route('/')

/**
 * @swagger
 * /music:
 *  get:
 *    summary: Regresa una lista de canciones
 *    tags: [Music]
 *    responses:
 *      200:
 *        description: Lista de canciones
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Music'
 */

  .get((req: Request, res: Response) => {
    const { id } = req?.query;
    let data = [];

    if (id) data = controller.getDataById(id)
    else data = controller.getAllData()

    res.json(data).status(200)
  })

export default router;