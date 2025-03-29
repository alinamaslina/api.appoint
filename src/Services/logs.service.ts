import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { CreateLogDto } from "../DTO/create-log.dto";
import { LogDataClass } from "../Schemas/log.schema";
import { CustomRequest } from "../Common/common.interfaces";

const hyperid = require("hyperid");
const generateId = hyperid({ urlSafe: true });

@Injectable()
export class LogsService {
  constructor(
      @InjectModel(LogDataClass.name)
      private LogsModel: Model<LogDataClass>
  ) {}

  async log(req: Partial<CustomRequest>): Promise<LogDataClass> {
    const id = `log${generateId()}`;
    const created = {
      date: Date.now(),
      userId: req?.user?.sub || "unauthorized",
    };

    const createdLog = new this.LogsModel({
      id,
      url: req?.url || "unknown",
      method: req?.method || "unknown",
      body: req?.body ? JSON.stringify(req.body) : "{}",
      created,
    });

    return createdLog.save();
  }

  async findAll(): Promise<Omit<LogDataClass, "_id">[]> {
    const logs = await this.LogsModel.find().exec();
    return logs.map(({ _id, ...data }) => data);
  }

  async findOne(id: string): Promise<LogDataClass> {
    return this.LogsModel.findOne({ id }).exec();
  }
}