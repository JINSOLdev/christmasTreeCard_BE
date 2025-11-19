import { Module } from '@nestjs/common';
import { TreeController } from './tree.controller';
import { TreeService } from './tree.service';
import { TreeRepository } from './tree.repository';

@Module({
  controllers: [TreeController],
  providers: [TreeService, TreeRepository],
})
export class TreeModule {}
