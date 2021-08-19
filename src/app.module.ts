import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PriorityModule } from './priority/priority.module';

@Module({
  imports: [PriorityModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
