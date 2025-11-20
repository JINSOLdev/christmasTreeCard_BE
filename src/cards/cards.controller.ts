import { Body, Controller, Get, Post } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';

@Controller('/api/cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Post()
  createCard(@Body() dto: CreateCardDto) {
    return this.cardsService.createCard(dto);
  }

  @Get()
  getCards() {
    return this.cardsService.getCards();
  }
}
