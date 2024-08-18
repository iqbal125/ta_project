import { Module } from '@nestjs/common';
import { HealthModule } from './modules/health/health.module';
import { SentimentModule } from './modules/sentiment/sentiment.module';
import { PrismaModule } from 'nestjs-prisma';
import { providePrismaClientExceptionFilter } from 'nestjs-prisma';

@Module({
  imports: [
    HealthModule,
    SentimentModule,
    PrismaModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [providePrismaClientExceptionFilter()],
})
export class AppModule {}
