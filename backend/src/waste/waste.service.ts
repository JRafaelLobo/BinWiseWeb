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
  ) {}

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

    console.log({
      wasteName,
      confidence,
      predictions,
    });

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
    const recommendations: Record<
      string,
      string
    > = {
      cardboard:
        'Doblar y depositar el cartón limpio en el contenedor correspondiente.',
      glass:
        'Depositar el vidrio en el contenedor verde y separar tapas o accesorios.',
      metal:
        'Reciclar latas y envases metálicos limpios.',
      paper:
        'Mantener el papel seco y libre de residuos antes de reciclarlo.',
      plastic:
        'Lavar los envases plásticos antes de depositarlos para reciclaje.',
      trash:
        'Depositar en el contenedor de residuos generales.',
    };

    return (
      recommendations[wasteType] ??
      'Clasificación realizada.'
    );
  }

  async getCategories(): Promise<
    WasteCategory[]
  > {
    return this.wasteCategoriesRepository.find();
  }
}