import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WasteController } from './waste.controller';
import { WasteService } from './waste.service';
import { WasteCategory } from './waste-category.entity';
import { AuthModule } from '../auth/auth.module';
import { AiService } from './ai.service';

@Module({
  imports: [TypeOrmModule.forFeature([WasteCategory]), AuthModule],
  controllers: [WasteController],
  providers: [WasteService, AiService],
})
export class WasteModule {}
