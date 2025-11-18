import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CardsRepository {
  constructor(private readonly prisma: PrismaService) {}

  createCard(data) {
    return this.prisma.card.create({ data });
  }

  createOrnament(data) {
    return this.prisma.ornament.create({ data });
  }
}
