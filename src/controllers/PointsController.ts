import { Request, Response } from 'express';
import knex from '../database/connection';

class PointsController {
  async index (request: Request, response: Response) {
    const points = await knex('points').select('*');

    return response.json(points);
  }

  async show (request: Request, response: Response) {
    const {id} = request.params;

    const point = await knex('points').where('id', id).first();

    if (!point) {
      return response.status(400).json({ message: 'Point not Found.'});
    }

    const items = await knex('items')
      .join('point_items','items.id', '=', 'point_items.item_id')
      .where('point_items.point_id', id);

    return response.json({point, items});
  }

  async create (request: Request, response: Response) {
    const {
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      items
    } = request.body;

    const trx = await knex.transaction();

    const insertedId = await trx('points').insert({
      image: 'image-fake',
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf
    });

    const points = await trx('points').select('*');

    const point_id = points[insertedId[0]-1].id;

    const pointItems = items.map((item_id: string) => {
      return {
        item_id,
        point_id,
      }
    })

    await trx('point_items').insert(pointItems);

    return response.json(points[insertedId[0]-1]);
  }
}

export default PointsController;
