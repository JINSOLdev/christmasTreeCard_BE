import { PrismaClient } from '@prisma/client';
import { CardTemplate, OrnamentType } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // 크리스마스 트리 생성
  const tree = await prisma.tree.create({
    data: {
      name: '2025 크리스마스 트리',
      slug: 'christmas-2025',
      startAt: new Date('2025-12-01T00:00:00Z'),
      endAt: new Date('2025-12-31T23:59:59Z'),
    },
  });

  console.log('Created tree:', tree);

  // 샘플 카드 데이터 생성
  const cards = [
    {
      toName: 'Santa',
      fromName: 'Emma',
      message: 'Merry Christmas! Hope you have a wonderful holiday season! 🎄',
      templateType: CardTemplate.CLASSIC,
    },
    {
      toName: 'Family',
      fromName: 'John',
      message:
        'Wishing everyone a joyful Christmas filled with love and laughter! 🎅',
      templateType: CardTemplate.CUTE,
    },
    {
      toName: 'Best Friend',
      fromName: 'Sarah',
      message: 'You make every day brighter! Merry Christmas! ⭐',
      templateType: CardTemplate.MODERN,
    },
    {
      toName: 'Mom & Dad',
      fromName: 'Mike',
      message: 'Thank you for everything. Merry Christmas! 🎁',
      templateType: CardTemplate.PIXEL,
    },
    {
      toName: 'Everyone',
      fromName: 'Lisa',
      message: 'Peace, love, and joy to all this Christmas! 🕊️',
      templateType: CardTemplate.CLASSIC,
    },
  ];

  const ornamentTypes = [
    OrnamentType.BALL,
    OrnamentType.GIFT,
    OrnamentType.RIBBON,
    OrnamentType.SOCK,
    OrnamentType.SNOW,
  ];

  // 카드와 장식 생성
  for (let i = 0; i < cards.length; i++) {
    const cardData = cards[i];

    const card = await prisma.card.create({
      data: cardData,
    });

    // 트리에 랜덤 위치에 장식 걸기
    const ornament = await prisma.ornament.create({
      data: {
        cardId: card.id,
        treeId: tree.id,
        type: ornamentTypes[i % ornamentTypes.length],
        posX: Math.random(), // 0.0 ~ 1.0
        posY: Math.random(), // 0.0 ~ 1.0
        // 일부 장식은 특정 날짜부터 보이도록 설정
        visibleFrom: i % 3 === 0 ? new Date('2025-12-10T00:00:00Z') : null,
        visibleUntil: i % 4 === 0 ? new Date('2025-12-25T23:59:59Z') : null,
      },
    });

    console.log(`Created card ${i + 1}:`, card);
    console.log(`Created ornament ${i + 1}:`, ornament);
  }

  console.log('Seed data created successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
