import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { WasteCategory } from './waste-category.entity';
import { ClassifyWasteResponseDto } from './dto/classify-waste-response.dto';
import { AiService } from './ai.service';


@Injectable()
export class WasteService {
  constructor(
    @InjectRepository(WasteCategory)
    private wasteCategoriesRepository: Repository<WasteCategory>,

    private readonly aiService: AiService,
  ) { }
  private readonly CLASSES = [
    'cardboard',
    'glass',
    'metal',
    'paper',
    'plastic',
    'trash',
  ];

  async classify(
    file: Express.Multer.File,
  ): Promise<ClassifyWasteResponseDto> {

    const predictions =
      await this.aiService.predict(
        file.buffer,
      );

    const confidence =
      Math.max(...predictions);

    const predictedIndex =
      predictions.indexOf(confidence);

    const wasteName =
      this.CLASSES[predictedIndex];

    const category =
      await this.wasteCategoriesRepository.findOne({
        where: {
          name: wasteName,
        },
      });

    if (!category) {
      throw new NotFoundException(
        `Category '${wasteName}' not found`,
      );
    }
    return {
      wasteName,
      category,
      confidence,
      recommendation:
        this.getRecommendation(
          wasteName,
        ),
    };
  }

  private getRecommendation(
    wasteType: string,
  ): string {

    const recommendations = {
      cardboard:
        'Depositar limpio y seco en reciclaje de cartón.',
      glass:
        'Depositar en el contenedor de vidrio.',
      metal:
        'Separar y reciclar junto con metales.',
      paper:
        'Mantener seco antes de reciclar.',
      plastic:
        'Lavar y depositar en reciclaje de plásticos.',
      trash:
        'Desechar en residuos generales.',
    };

    return (
      recommendations[wasteType] ??
      'Clasificación realizada.'
    );
  }

  async getCategories(): Promise<WasteCategory[]> {
    return this.wasteCategoriesRepository.find();
  }
}