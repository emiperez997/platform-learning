import { PrismaService } from 'src/prisma/prisma.service';
import { Inscription } from './interfaces/Inscription';
import { CreateInscriptionDto } from './dto/CreateInscriptionDto';
import { UpdateInscriptionDto } from './dto/UpdateInscription';
export declare class InscriptionService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<Inscription[]>;
    findOne(id: number): Promise<Inscription>;
    create(inscription: CreateInscriptionDto): Promise<Inscription>;
    update(id: number, inscription: UpdateInscriptionDto): Promise<Inscription>;
    delete(id: number): Promise<Inscription>;
}
