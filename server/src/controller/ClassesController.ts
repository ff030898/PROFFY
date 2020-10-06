import Knex from "../database/connection";
import { NextFunction, Request, Response } from "express";
import convertHoursToMinutes from "../utils/convertHoursToMinutes";

interface Schedule_Item {
  week_day: Number;
  from: string;
  to: string;
}

class ClassesController {
  async index(req: Request, res: Response, next: NextFunction) {
    try {
      const filters = req.query;

      const week_day = filters.week_day as string;
      const subject = filters.subject as string;
      const time = filters.time as string;

      if (!filters.week_day || !filters.subject || !filters.time) {
        return res
          .status(400)
          .json({ error: "Missing filters to search classes" });
      }

      const timeInMInutes = convertHoursToMinutes(time);

      const classes = await Knex("classes")
        .join("users", "classes.user_id", "=", "users.id")
        .select(["classes.*", "users.*"])
        .whereExists(function () {
          this.select("class_schedule.*")
            .from("class_schedule")
            .whereRaw("`class_schedule`.`class_id` = `classes`.`id`")
            .whereRaw("`class_schedule`.`week_day` = ??", [Number(week_day)])
            .whereRaw("`class_schedule`.`from` <= ??", [Number(timeInMInutes)])
            .whereRaw("`class_schedule`.`to` > ??", [Number(timeInMInutes)]);
        })
        .where("classes.subject", subject);
      return res.status(200).json(classes);
    } catch (error) {
      next(error);
    }
  }

  async show(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, avatar, whatsapp, bio, subject, cost, schedule } = req.body;

      const trx = await Knex.transaction();

      const user = {
        name,
        avatar,
        whatsapp,
        bio,
      };

      const insertUser = await trx("users").insert(user);

      const user_id = insertUser[0];

      const classes = {
        subject,
        cost,
        user_id,
      };

      const insertClasses = await trx("classes").insert(classes);

      const class_id = insertClasses[0];

      const classSchedule = schedule.map((scheduleItem: Schedule_Item) => {
        return {
          class_id,
          week_day: scheduleItem.week_day,
          from: convertHoursToMinutes(scheduleItem.from),
          to: convertHoursToMinutes(scheduleItem.to),
        };
      });

      await trx("class_schedule").insert(classSchedule);

      await trx.commit();

      return res.status(200).json({ message: "Classe create successfull" });
    } catch (error) {
      return res.status(400).json({ message: "Error" });
      next(error);
    }
  }
}
export default ClassesController;
