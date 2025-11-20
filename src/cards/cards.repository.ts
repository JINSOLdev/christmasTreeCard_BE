import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCardDto } from './dto/create-card.dto';

@Injectable()
export class CardsRepository {
  constructor(private readonly prisma: PrismaService) {}

  createCard(data: CreateCardDto) {
    return this.prisma.card.create({ data });
  }

  createOrnament(data: Prisma.OrnamentCreateInput) {
    return this.prisma.ornament.create({ data });
  }

  findCards() {
    return this.prisma.card.findMany({
      include: {
        ornament: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
  }
}
