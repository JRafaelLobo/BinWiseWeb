import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EducationModule } from './education-module.entity';
import { UserModuleProgress } from './user-module-progress.entity';
import { EducationModuleDto } from './dto/education-module.dto';
import { EducationModuleDetailDto } from './dto/education-module-detail.dto';

@Injectable()
export class EducationService {
  constructor(
    @InjectRepository(EducationModule)
    private educationModulesRepository: Repository<EducationModule>,
    @InjectRepository(UserModuleProgress)
    private userModuleProgressRepository: Repository<UserModuleProgress>,
  ) {}

  async getModules(userId: number): Promise<EducationModuleDto[]> {
    const modules = await this.educationModulesRepository.find();
    const userProgress = await this.userModuleProgressRepository.find({ where: { user: { id: userId } } });

    return modules.map(module => {
      const progress = userProgress.find(p => p.module.id === module.id);
      return {
        id: module.id,
        title: module.title,
        description: module.description,
        estimatedMinutes: module.estimatedMinutes,
        completed: progress ? progress.completed : false,
      };
    });
  }

  async getModuleById(id: number): Promise<EducationModuleDetailDto> {
    const module = await this.educationModulesRepository.findOne({ where: { id } });
    if (!module) {
      throw new NotFoundException('Módulo no encontrado.');
    }
    return {
      id: module.id,
      title: module.title,
      description: module.description,
      estimatedMinutes: module.estimatedMinutes,
      completed: false, // This should be based on the user's progress
      content: module.content,
    };
  }
}
