import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RecyclingRecord } from './recycling-record.entity';
import { RecyclingRegisterRequestDto } from './dto/recycling-register-request.dto';
import { User } from '../auth/user.entity';
import { WasteCategory } from '../waste/waste-category.entity';
import { RewardsService } from '../rewards/rewards.service';

@Injectable()
export class RecyclingService {
  constructor(
    @InjectRepository(RecyclingRecord)
    private recyclingRecordsRepository: Repository<RecyclingRecord>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(WasteCategory)
    private wasteCategoriesRepository: Repository<WasteCategory>,
    private rewardsService: RewardsService,
  ) { }

  async register(userId: number, recyclingRegisterRequestDto: RecyclingRegisterRequestDto): Promise<RecyclingRecord> {
    const { wasteName, categoryId, quantity, notes } = recyclingRegisterRequestDto;

    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const category = await this.wasteCategoriesRepository.findOne({ where: { id: categoryId } });
    if (!category) {
      throw new NotFoundException('Waste category not found');
    }

    const pointsEarned = quantity * 10; // 10 points per item recycled

    const recyclingRecord = this.recyclingRecordsRepository.create({
      user,
      wasteName,
      category,
      quantity,
      pointsEarned,
      notes,
    });

    await this.recyclingRecordsRepository.save(recyclingRecord);

    user.totalPoints += pointsEarned;
    await this.usersRepository.save(user);

    await this.rewardsService.checkAndGrantRewards(userId);

    return recyclingRecord;
  }

  async getHistory(userId: number): Promise<RecyclingRecord[]> {
    return this.recyclingRecordsRepository.find({
      where: { user: { id: userId } },
      relations: ['category'],
    });
  }
}
