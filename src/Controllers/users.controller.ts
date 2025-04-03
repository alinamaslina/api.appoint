import {
  Body,
  Controller,
  Query,
  Get,
  Put,
  Post,
  UseGuards,
} from "@nestjs/common";
import { CreateUserDto } from "../DTO/create-user.dto";
import { UsersDataClass } from "../Schemas/users.schema";
import { UsersService } from "../Services/users.service";
import { AuthGuard } from "../Services/auth.guard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import {AuthService} from "../Services/auth.service";


@ApiTags('User')
@ApiBearerAuth() // Enable Bearer Auth for Swagger UI
@Controller("user")
export class UsersController {
  constructor(private readonly UsersService: UsersService,
              private readonly authService: AuthService) {}

  @Post("register")
  async register(@Body() dto: CreateUserDto) {
    return this.authService.registerUser(dto);
  }

  // @Post()
  // async create(@Body() CreateUsersDto: CreateUserDto) {
  //   await this.UsersService.create(CreateUsersDto);
  // }

  // @Get()
  // async findAll(): Promise<UsersDataClass[]> {
  //   return this.UsersService.findAll();
  // }

  // @Post('register')
  // async register(@Body() createUserDto: CreateUserDto) {
  //   return this.UsersService.register(createUserDto);
  // }

  @UseGuards(AuthGuard)
  @Get()
  async findOne(@Query("id") id: string): Promise<UsersDataClass> {
    return this.UsersService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Put()
  async update(@Body() UserDto: CreateUserDto) {
    return this.UsersService.update(UserDto);
  }

  // @Delete(":id")
  // async delete(@Param("id") id: string) {
  //   return this.UsersService.delete(id);
  // }
}
