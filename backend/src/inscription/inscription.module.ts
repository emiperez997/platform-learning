import { Module } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { InscriptionController } from "./inscription.controller";
import { InscriptionService } from "./inscription.service";
import { JwtService } from "@nestjs/jwt";

@Module({
  imports: [],
  controllers: [InscriptionController],
  providers: [InscriptionService, JwtService],
})
export class InscriptionModule {}
