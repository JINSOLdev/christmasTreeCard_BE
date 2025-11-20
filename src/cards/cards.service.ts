import { Injectable } from '@nestjs/common';
import { CardsRepository } from './cards.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCardDto } from './dto/create-card.dto';
import { OrnamentType } from '@prisma/client';

@Injectable()
export class CardsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cardsRepository: CardsRepository,
  ) {}

  async createCard(dto: CreateCardDto) {
    //랜덤 위치
    const posX = Number(Math.random() * 0.8 + 0.1);
    const posY = Number(Math.random() * 0.7 + 0.15);

    // 랜덤 오너먼트 타입 선택
    const types = [
      OrnamentType.HEART,
      OrnamentType.DOLL,
      OrnamentType.GIFT,
      OrnamentType.RIBBON,
      OrnamentType.SNOW,
    ];

    const type = types[Math.floor(Math.random() * types.length)];

    return this.prisma.$transaction(async (tx) => {
      // 1. 트리 먼저 가져오기 (slug 기준)
      const tree = await tx.tree.findFirst({
        where: { slug: 'christmas-2025' },
      });

      if (!tree) {
        throw new Error('Tree not found for slug');
      }

      // 2. 카드 생성
      const card = await tx.card.create({ data: dto });

      // 3. 오너먼트 생성
      const ornament = await tx.ornament.create({
        data: {
          cardId: card.id,
          treeId: tree.id,
          type,
          posX,
          posY,
        },
      });

      // 4. 응답
      return {
        cardId: card.id,
        ornamentId: ornament.id,
        position: { x: posX, posY },
      };
    });
  }

  async getCards() {
    const cards = await this.cardsRepository.findCards();

    return cards.map((card) => ({
      id: card.id,
      toName: card.toName,
      fromName: card.fromName,
      message: card.message,
      templateType: card.templateType,
      createdAt: card.createdAt,
      ornamentType: card.ornament?.type ?? null,
      posX: card.ornament?.posX ?? null,
      posY: card.ornament?.posY ?? null,
    }));
  }
}
