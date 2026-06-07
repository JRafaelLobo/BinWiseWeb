import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../auth/user.entity';
import { RecyclingRecord } from '../recycling/recycling-record.entity';
import { UserReward } from '../rewards/user-reward.entity';
import { UserStatsDto } from './dto/user-stats.dto';

@Injectable()
export class StatsService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(RecyclingRecord)
    private recyclingRecordsRepository: Repository<RecyclingRecord>,
    @InjectRepository(UserReward)
    private userRewardsRepository: Repository<UserReward>,
  ) {}

  async getUserStats(userId: number): Promise<UserStatsDto> {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error('User not found');
    }

    const totalRecycledItems = await this.recyclingRecordsRepository.sum('quantity', { user: { id: userId } });
    const rewardsEarned = await this.userRewardsRepository.count({ where: { user: { id: userId } } });
    const lastRecyclingRecord = await this.recyclingRecordsRepository.findOne({
      where: { user: { id: userId } },
      order: { recycledAt: 'DESC' },
    });

    const mostRecycled = await this.recyclingRecordsRepository
      .createQueryBuilder('record')
      .select('category.name', 'categoryName')
      .addSelect('SUM(record.quantity)', 'total')
      .innerJoin('record.category', 'category')
      .where('record.userId = :userId', { userId })
      .groupBy('category.name')
      .orderBy('total', 'DESC')
      .getRawOne();

    return {
      userId,
      totalRecycledItems: totalRecycledItems || 0,
      totalPoints: user.totalPoints,
      currentLevel: user.level,
      rewardsEarned,
      mostRecycledCategory: mostRecycled ? mostRecycled.categoryName : 'N/A',
      lastRecyclingDate: lastRecyclingRecord ? lastRecyclingRecord.recycledAt : null,
    };
  }
}
