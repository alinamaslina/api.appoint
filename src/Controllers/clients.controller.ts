import {Body, Controller, Delete, Get, Injectable, Patch, Post, Put, Query,} from "@nestjs/common";
// import { Cron } from "@nestjs/schedule";
import {CreateClientDto} from "../DTO/create-client.dto";
import {ClientsDataClass} from "../Schemas/clients.schema";
import {ClientsService} from "../Services/clients.service";
import {LogsService} from "../Services/logs.service";
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {AuthService} from "../Services/auth.service";

@ApiTags('Clients')
@ApiBearerAuth() // Enable Bearer Auth for Swagger UI
@Injectable()
@Controller("clients")
export class ClientsController {
  constructor(
    private readonly ClientsService: ClientsService,
    private readonly logsService: LogsService,
    private readonly authService: AuthService) {}

  @Post("register")
  async register(@Body() dto: CreateClientDto) {
    return this.authService.registerClient(dto);
  }

  // @Post('register')
  // async register(@Body() createClientDto: CreateClientDto) {
  //   return this.ClientsService.register(createClientDto);
  // }

  @Post()
  async create(@Body() createClientDto: CreateClientDto) {
    return this.ClientsService.create(createClientDto);
  }

  @Put()
  async update(@Body() createClientDto: CreateClientDto) {
    return this.ClientsService.update(createClientDto);
  }

  @Patch()
  async updateValue(@Body() createClientDto: CreateClientDto) {
    return this.ClientsService.updateValue(createClientDto);
  }

  // TODO: add guards for users data safety
  @Get()
  async findAll(): Promise<ClientsDataClass[]> {
    return this.ClientsService.findAll();
  }

  @Get(":id")
  async findOne(@Query("id") id: string): Promise<ClientsDataClass> {
    return this.ClientsService.findOne(id);
  }

  @Delete()
  async delete(@Query("id") id: string) {
    return this.ClientsService.delete(id);
  }
}
