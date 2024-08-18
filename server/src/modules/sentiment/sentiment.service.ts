import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { Sentiment } from '@prisma/client';

enum SentimentsE {
  POSITIVE = 'positive',
  NEUTRAL = 'neutral',
  NEGATIVE = 'negative',
}

@Injectable()
export class SentimentService {
  constructor(private prisma: PrismaService) {}

  sentiments: SentimentsE[] = [
    SentimentsE.POSITIVE,
    SentimentsE.NEUTRAL,
    SentimentsE.NEGATIVE,
  ];

  private getSentiment(score: number): SentimentsE {
    if (score > 0.5) {
      return SentimentsE.POSITIVE;
    } else if (score < -0.5) {
      return SentimentsE.NEGATIVE;
    } else {
      return SentimentsE.NEUTRAL;
    }
  }

  async analyzeSentiment(text: string): Promise<Sentiment> {
    const score = parseFloat((Math.random() * 2 - 1).toFixed(2));
    const sentiment = this.getSentiment(score);

    return this.prisma.sentiment.create({
      data: {
        text,
        sentiment,
        score,
      },
    });
  }
}
