import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TreeRepository {
  constructor(private readonly prisma: PrismaService) {}

  findTreeBySlug(slug: string) {
    return this.prisma.tree.findFirst({ where: { slug } });
  }

  findOrnamentsByTreeId(treeId: string, visibleFrom?: string) {
    return this.prisma.ornament.findMany({
      where: {
        treeId,
        visibleFrom: visibleFrom ? { lte: new Date(visibleFrom) } : undefined,
      },
      include: {
        card: true,
      },
      orderBy: { createdAt: 'asc' },
    });
  }
}
