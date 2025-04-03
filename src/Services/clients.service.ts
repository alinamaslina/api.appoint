import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { CreateClientDto } from "../DTO/create-client.dto";
import { ClientsDataClass } from "../Schemas/clients.schema";
import {AuthDataClass} from "../Schemas/auth.schema";

const hyperid = require("hyperid");
const generateId = hyperid({ urlSafe: true });

@Injectable()
export class ClientsService {
  constructor(
      @InjectModel(ClientsDataClass.name) private clientsModel: Model<ClientsDataClass>,
      @InjectModel(AuthDataClass.name) private authModel: Model<AuthDataClass>
  ) {}


  async register(dto: CreateClientDto): Promise<ClientsDataClass> {
    const id = generateId();
    const timestamp = {
      date: Date.now(),
      userId: 0,
    };

    const createdClient = new this.clientsModel({
      id,
      ...dto,
      created: timestamp,
      updated: timestamp,
    });

    await createdClient.save();

    // 👇 добавим запись в auth_data
    await this.authModel.create({
      id,
      login: dto.email,
      pass: dto.pass,
    });

    return createdClient;
  }

  async create(createClientDto: CreateClientDto): Promise<ClientsDataClass> {
    const id = generateId();
    const timestamp = {
      date: new Date().getTime(),
      userId: 0,
    };

    const createdClient = new this.clientsModel({
      id,
      ...createClientDto,
      created: timestamp,
      updated: timestamp,
    });

    return createdClient.save();
  }

  async update(createClientDto: CreateClientDto): Promise<ClientsDataClass> {
    const updated = {
      date: new Date().getTime(),
      userId: 0,
    };
    const { id, ...updateData } = createClientDto;

    return this.clientsModel.findOneAndUpdate(
        { id },
        { ...updateData, updated },
        { new: true }
    );
  }

  async updateValue(createClientDto: CreateClientDto): Promise<ClientsDataClass> {
    const updated = {
      date: new Date().getTime(),
      userId: 0,
    };
    const { id, ...updateData } = createClientDto;

    return this.clientsModel.findOneAndUpdate(
        { id },
        { ...updateData, updated }
    );
  }

  async findAll(): Promise<ClientsDataClass[]> {
    const clients = await this.clientsModel.find().exec();

    return clients.map((client) => {
      const { _id, ...clientData } = client.toObject();
      return { ...clientData };
    });
  }

  async findOne(id: string): Promise<ClientsDataClass> {
    return this.clientsModel.findOne({ id }).exec();
  }

  async delete(id: string) {
    return this.clientsModel.deleteOne({ id }).exec();
  }
}