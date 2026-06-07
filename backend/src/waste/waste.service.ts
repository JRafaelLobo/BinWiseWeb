import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { WasteCategory } from './waste-category.entity';
import { ClassifyWasteResponseDto } from './dto/classify-waste-response.dto';

@Injectable()
export class WasteService {
  constructor(
    @InjectRepository(WasteCategory)
    private wasteCategoriesRepository: Repository<WasteCategory>,
  ) {}

  async classify(
    file: Express.Multer.File,
  ): Promise<ClassifyWasteResponseDto> {

    const category =
      await this.wasteCategoriesRepository.findOne({
        where: { id: 1 },
      });

    if (!category) {
      throw new NotFoundException(
        'Category not found',
      );
    }

    return {
      wasteName: 'Botella plástica',
      category,
      confidence: 0.94,
      recommendation:
        'Depositar en el contenedor amarillo y retirar líquidos antes de reciclar.',
    };
  }

  async getCategories(): Promise<WasteCategory[]> {
    return this.wasteCategoriesRepository.find();
  }
}