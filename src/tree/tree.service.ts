import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { TreeRepository } from './tree.repository';

@Injectable()
export class TreeService {
  constructor(private readonly treeRepo: TreeRepository) {}

  async getOrnaments(slug: string, visibleFrom?: string) {
    // 1. slug 유효성 검사
    if (!slug) {
      throw new BadRequestException('트리 slug 값이 필요합니다.');
    }

    // 2. visibleFrom 날짜 형식 검사
    let visibleFromDate: Date | undefined = undefined;

    if (visibleFrom) {
      const date = new Date(visibleFrom);

      if (Number.isNaN(date.getTime())) {
        throw new BadRequestException(
          'visibleFroma은 올바른 날짜 형식이어야 합니다.',
        );
      }
      visibleFromDate = date;
    }

    // 3. 트리 조회
    const tree = await this.treeRepo.findTreeBySlug(slug);
    if (!tree) {
      throw new NotFoundException('트리를 찾을 수 없습니다.');
    }

    // 4. 오너먼트와 카드 조회
    const ornaments = await this.treeRepo.findOrnamentsByTreeId(
      tree.id,
      visibleFromDate,
    );

    // 5. FE용 데이터 매핑
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
