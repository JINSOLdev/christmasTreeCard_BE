import { Injectable, NotFoundException } from '@nestjs/common';
import { TreeRepository } from './tree.repository';

@Injectable()
export class TreeService {
  constructor(private readonly treeRepo: TreeRepository) {}

  async getOrnaments(slug: string, visibleFrom?: string) {
    // 1. 트리 조회
    const tree = await this.treeRepo.findTreeBySlug(slug);
    if (!tree) {
      throw new NotFoundException('Tree not found');
    }

    // 2. 오너먼트와 카드 조회
    const ornaments = await this.treeRepo.findOrnamentsByTreeId(
      tree.id,
      visibleFrom,
    );

    // 3. FE용 데이터 매핑
    const mapped = ornaments.map((ornament) => ({
      id: ornament.id,
      x: ornament.posX,
      y: ornament.posY,
      type: ornament.type,
      preview: ornament.card?.message?.slice(0, 15) ?? '',
    }));

    return {
      tree: tree.name,
      ornaments: mapped,
    };
  }
}
