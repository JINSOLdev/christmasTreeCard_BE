import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { CardsModule } from './cards/cards.module';
import { TreeModule } from './tree/tree.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 전체 모듈에서 env 사용 가능
    }),
    PrismaModule,
    CardsModule,
    TreeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
