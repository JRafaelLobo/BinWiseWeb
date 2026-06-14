import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserReward } from './user-reward.entity';
import { UserRewardDto } from './dto/user-reward.dto';
import { Reward } from './reward.entity';
import { User } from '../auth/user.entity';

@Injectable()
export class RewardsService {
  constructor(
    @InjectRepository(UserReward)
    private userRewardsRepository: Repository<UserReward>,
    @InjectRepository(Reward)
    private rewardsRepository: Repository<Reward>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async getUserRewards(userId: number): Promise<UserRewardDto[]> {
    const userRewards = await this.userRewardsRepository.find({
      where: { user: { id: userId } },
      relations: ['reward'],
    });

    return userRewards.map(ur => ({
      id: ur.reward.id,
      name: ur.reward.name,
      description: ur.reward.description,
      type: ur.reward.type,
      earnedAt: ur.earnedAt,
    }));
  }

  async checkAndGrantRewards(userId: number) {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error('User not found');
    }
    const allRewards = await this.rewardsRepository.find();

    // Recompensas que el usuario ya tiene (consultadas directamente).
    const existingRewards = await this.userRewardsRepository.find({
      where: { user: { id: userId } },
      relations: ['reward'],
    });

    for (const reward of allRewards) {
      const hasReward = existingRewards.some(ur => ur.reward.id === reward.id);
      if (!hasReward && user.totalPoints >= reward.pointsRequired) {
        const newUserReward = this.userRewardsRepository.create({ user, reward });
        await this.userRewardsRepository.save(newUserReward);
      }
    }
  }
}
