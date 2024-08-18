import { Controller, Post, Body } from '@nestjs/common';
import { CreateSentimentDto } from './dto/create-sentiment.dto';

import { SentimentService } from './sentiment.service';
import { Sentiment } from '@prisma/client';

@Controller()
export class SentimentController {
  constructor(private readonly SentimentService: SentimentService) {}

  @Post('sentiment')
  async analyzeSentiment(
    @Body() SentimentData: CreateSentimentDto,
  ): Promise<Sentiment> {
    return this.SentimentService.analyzeSentiment(SentimentData.text);
  }
}
