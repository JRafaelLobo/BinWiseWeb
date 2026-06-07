import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecyclingController } from './recycling.controller';
import { RecyclingService } from './recycling.service';
import { RecyclingRecord } from './recycling-record.entity';
import { AuthModule } from '../auth/auth.module';
import { User } from '../auth/user.entity';
import { WasteCategory } from '../waste/waste-category.entity';
import { RewardsModule } from '../rewards/rewards.module';

@Module({
  imports: [TypeOrmModule.forFeature([RecyclingRecord, User, WasteCategory]), AuthModule, RewardsModule],
  controllers: [RecyclingController],
  providers: [RecyclingService],
})
export class RecyclingModule {}
