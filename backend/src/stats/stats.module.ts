import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatsController } from './stats.controller';
import { StatsService } from './stats.service';
import { User } from '../auth/user.entity';
import { RecyclingRecord } from '../recycling/recycling-record.entity';
import { UserReward } from '../rewards/user-reward.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([User, RecyclingRecord, UserReward]), AuthModule],
  controllers: [StatsController],
  providers: [StatsService],
})
export class StatsModule {}
