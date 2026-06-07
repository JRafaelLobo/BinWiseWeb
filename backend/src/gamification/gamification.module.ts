import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GamificationController } from './gamification.controller';
import { GamificationService } from './gamification.service';
import { User } from '../auth/user.entity';
import { RecyclingRecord } from '../recycling/recycling-record.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([User, RecyclingRecord]), AuthModule],
  controllers: [GamificationController],
  providers: [GamificationService],
})
export class GamificationModule {}
