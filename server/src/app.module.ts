import { Module } from '@nestjs/common';
import { HealthModule } from './modules/health/health.module';
import { TodoModule } from './modules/todo/todo.module';
import { PrismaModule } from 'nestjs-prisma';
import { providePrismaClientExceptionFilter } from 'nestjs-prisma';

@Module({
  imports: [
    HealthModule,
    TodoModule,
    PrismaModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [providePrismaClientExceptionFilter()],
})
export class AppModule {}
