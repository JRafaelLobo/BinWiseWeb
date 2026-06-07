import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThan } from 'typeorm';
import { User } from '../auth/user.entity';
import { RecyclingRecord } from '../recycling/recycling-record.entity';
import { PointsResponseDto } from './dto/points-response.dto';
import { LevelResponseDto } from './dto/level-response.dto';

@Injectable()
export class GamificationService {
  private levels = [
    { level: 1, name: 'Eco Novato', points: 0 },
    { level: 2, name: 'Eco Aspirante', points: 100 },
    { level: 3, name: 'Eco Aprendiz', points: 250 },
    { level: 4, name: 'Eco Amigo', points: 500 },
    { level: 5, name: 'Eco Héroe', points: 1000 },
  ];

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(RecyclingRecord)
    private recyclingRecordsRepository: Repository<RecyclingRecord>,
  ) { }

  async getPoints(userId: number): Promise<PointsResponseDto> {
    const user = await this.usersRepository.findOne({ where: { id: userId } });


    if (!user) {
      throw new NotFoundException('User not found');
    }

    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const pointsThisMonth = await this.recyclingRecordsRepository.sum('pointsEarned', {
      user: { id: userId },
      recycledAt: MoreThan(firstDayOfMonth),
    });

    return {
      userId,
      totalPoints: user.totalPoints,
      pointsThisMonth: pointsThisMonth || 0,
    };
  }

  async getLevel(userId: number): Promise<LevelResponseDto> {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const userLevel = this.levels.slice().reverse().find(l => user.totalPoints >= l.points);
    if (!userLevel) {
      throw new NotFoundException('User level not found');
    }
    const nextLevel = this.levels.find(l => l.level === userLevel.level + 1);

    let pointsToNextLevel = 0;
    let progressPercentage = 100;

    if (nextLevel) {
      pointsToNextLevel = nextLevel.points - user.totalPoints;
      const pointsInCurrentLevel = user.totalPoints - userLevel.points;
      const pointsForNextLevel = nextLevel.points - userLevel.points;
      progressPercentage = (pointsInCurrentLevel / pointsForNextLevel) * 100;
    }

    // Update user level if it has changed
    if (user.level !== userLevel.level) {
      user.level = userLevel.level;
      await this.usersRepository.save(user);
    }

    return {
      userId,
      currentLevel: userLevel.level,
      currentLevelName: userLevel.name,
      totalPoints: user.totalPoints,
      pointsToNextLevel,
      progressPercentage,
    };
  }
}
