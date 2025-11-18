import { Body, Controller, Post } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';

@Controller('/api/cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Post()
  createCard(@Body() dto: CreateCardDto) {
    return this.cardsService.createCard(dto);
  }
}
