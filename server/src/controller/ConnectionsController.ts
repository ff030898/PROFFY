import Knex from "../database/connection";
import { NextFunction, Request, Response } from "express";

class ConnectionsController {
  async index(req: Request, res: Response, next: NextFunction) {
    try {
      const totalConnections = await Knex("connections").count("* as total");

      const { total } = totalConnections[0];
      return res.status(200).json({ total });
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { user_id } = req.body;

      await Knex("connections").insert({ user_id });
      return res.status(200).json({ message: "Connection create successfull" });
    } catch (error) {
      next(error);
    }
  }
}
export default ConnectionsController;
