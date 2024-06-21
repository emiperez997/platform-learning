import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { InscriptionController } from './inscription.controller';
import { InscriptionService } from './inscription.service';

@Module({
  imports: [],
  controllers: [InscriptionController],
  providers: [InscriptionService, PrismaService],
})
export class InscriptionModule {}
