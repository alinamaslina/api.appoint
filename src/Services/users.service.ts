import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { UsersDataClass } from "../Schemas/users.schema";
import { CreateUserDto } from "../DTO/create-user.dto";
import { AuthDataClass } from "../Schemas/auth.schema";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UsersDataClass.name) private usersModel: Model<UsersDataClass>,
    @InjectModel(AuthDataClass.name) private authModel: Model<AuthDataClass>
  ) {}

  async register(createUserDto: CreateUserDto): Promise<UsersDataClass> {
    const newUser = new this.usersModel(createUserDto);
    await newUser.save();

    // 👇 создаём пользователя в auth_data
    await this.authModel.create({
      id: createUserDto.id,
      login: createUserDto.email,
      pass: createUserDto.pass,
    });

    return newUser;
  }

  // async register(createCatDto: CreateUserDto): Promise<UsersDataClass> {
  //   const createdCat = new this.usersModel(createCatDto);
  //   return createdCat.save();
  // }

  async findAll(): Promise<UsersDataClass[]> {
    return this.usersModel.find().exec();
  }

  async findOne(id: string): Promise<UsersDataClass> {
    return this.usersModel.findOne({ id: id });
  }

  async update(user: CreateUserDto): Promise<CreateUserDto> {
    const { id, ...updateData } = user;

    const resp = await this.usersModel.findOneAndUpdate({ id }, updateData, {
      new: true,
    });

    return resp;
  }

  async delete(id: string) {
    const deletedCat = await this.usersModel
      .findByIdAndRemove({ _id: id })
      .exec();
    return deletedCat;
  }
}
