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
    // 1. 랜덤 위치 (트리 안에서 대략적인 비율)
    const posX = Number(Math.random() * 0.8 + 0.1);
    const posY = Number(Math.random() * 0.7 + 0.15);

    // 2. 랜덤 오너먼트 타입
    const types: OrnamentType[] = [
      OrnamentType.HEART,
      OrnamentType.DOLL,
      OrnamentType.GIFT,
      OrnamentType.RIBBON,
      OrnamentType.SNOW,
    ];
    const type = types[Math.floor(Math.random() * types.length)];

    return this.prisma.$transaction(async (tx) => {
      // 3. 트리 찾기 (없으면 생성)
      let tree = await tx.tree.findFirst({
        where: { slug: 'christmas-2025' },
      });

      if (!tree) {
        tree = await tx.tree.create({
          data: {
            name: '2025 크리스마스 트리',
            slug: 'christmas-2025',
            startAt: new Date('2025-12-01T00:00:00.000Z'),
            endAt: new Date('2025-12-31T23:59:59.999Z'),
          },
        });
      }

      // 4. 카드 생성
      const card = await tx.card.create({ data: dto });

      // 5. 오너먼트 생성 (트리랑 카드 연결)
      const ornament = await tx.ornament.create({
        data: {
          cardId: card.id,
          treeId: tree.id,
          type,
          posX,
          posY,
        },
      });

      // 6. 프론트에 돌려줄 응답
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
