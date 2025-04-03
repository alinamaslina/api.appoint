import {Injectable, UnauthorizedException} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { AuthDataClass } from "../Schemas/auth.schema";
import { UsersDataClass } from "../Schemas/users.schema";
import { ClientsDataClass } from "../Schemas/clients.schema";
import { CreateUserDto } from "../DTO/create-user.dto";
import { CreateClientDto } from "../DTO/create-client.dto";
import { Model } from "mongoose";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
      @InjectModel(AuthDataClass.name)
      private authModel: Model<AuthDataClass>,
      @InjectModel(UsersDataClass.name)
      private userModel: Model<UsersDataClass>,
      @InjectModel(ClientsDataClass.name)
      private clientModel: Model<ClientsDataClass>,
      private jwtService: JwtService
  ) {}

  async registerUser(dto: CreateUserDto): Promise<UsersDataClass> {
    const user = new this.userModel(dto);
    await user.save();

    await this.authModel.create({
      id: dto.id,
      login: dto.email,
      pass: dto.pass,
    });

    return user;
  }

  async registerClient(dto: CreateClientDto): Promise<ClientsDataClass> {
    const client = new this.clientModel(dto);
    await client.save();

    await this.authModel.create({
      id: dto.id,
      login: dto.email,
      pass: dto.pass,
    });

    return client;
  }

  async findOne(login: string): Promise<AuthDataClass> {
    return this.authModel.findOne({ login }).exec();
  }

  async signIn(email: string, password: string): Promise<any> {
    const user = await this.findOne(email);

    if (user?.pass !== password) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, username: user.login };
    return {
      token: await this.jwtService.signAsync(payload),
      id: user.id,
    };
  }
}