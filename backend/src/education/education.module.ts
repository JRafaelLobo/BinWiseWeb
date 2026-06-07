import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EducationController } from './education.controller';
import { EducationService } from './education.service';
import { EducationModule as EducationModuleEntity } from './education-module.entity';
import { UserModuleProgress } from './user-module-progress.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([EducationModuleEntity, UserModuleProgress]), AuthModule],
  controllers: [EducationController],
  providers: [EducationService],
})
export class EducationModule {}
