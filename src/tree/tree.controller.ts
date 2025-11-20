import { Controller, Get, Param, Query } from '@nestjs/common';
import { TreeService } from './tree.service';

@Controller('/api/tree')
export class TreeController {
  constructor(private readonly treeService: TreeService) {}

  @Get('/:slug/ornaments')
  async getOrnaments(
    @Param('slug') slug: string,
    @Query('visibleFrom') visibleFrom?: string,
  ) {
    return this.treeService.getOrnaments(slug, visibleFrom);
  }
}
