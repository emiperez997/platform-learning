import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
  ValidationPipe,
} from "@nestjs/common";
import { InscriptionService } from "./inscription.service";
import { Inscription } from "./interfaces/Inscription";
import { CreateInscriptionDto } from "./dto/CreateInscriptionDto";
import { UpdateInscriptionDto } from "./dto/UpdateInscription";
import { AuthGuard } from "src/auth/guards/AuthGuard";

@Controller("inscriptions")
// @UseGuards(AuthGuard)
export class InscriptionController {
  constructor(private readonly inscriptionService: InscriptionService) {}

  @Get()
  async findAll(): Promise<Inscription[]> {
    return this.inscriptionService.findAll();
  }

  @Get("/:id")
  async find(@Param("id", ParseIntPipe) id: number): Promise<Inscription> {
    return this.inscriptionService.findOne(id);
  }

  @Post()
  async create(
    @Body(ValidationPipe) inscription: CreateInscriptionDto,
  ): Promise<Inscription> {
    return this.inscriptionService.create(inscription);
  }

  @Put("/:id")
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body(ValidationPipe) inscription: UpdateInscriptionDto,
  ): Promise<Inscription> {
    return this.inscriptionService.update(id, inscription);
  }

  @Delete("/:id")
  async delete(@Param("id", ParseIntPipe) id: number): Promise<Inscription> {
    return this.inscriptionService.delete(id);
  }
}
