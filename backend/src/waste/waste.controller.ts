import { Controller, Post, UseInterceptors, UploadedFile, Get, UseGuards } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { WasteService } from './waste.service';
import { ApiTags, ApiOperation, ApiResponse, ApiConsumes, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { ClassifyWasteRequestDto } from './dto/classify-waste-request.dto';
import { ClassifyWasteResponseDto } from './dto/classify-waste-response.dto';
import { WasteCategory } from './waste-category.entity';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Waste')
@Controller('api/waste')
export class WasteController {
  constructor(private readonly wasteService: WasteService) {}

  @Post('classify')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Clasificar un desecho' })
  @ApiBody({ type: ClassifyWasteRequestDto })
  @ApiResponse({ status: 200, description: 'Desecho clasificado correctamente.', type: ClassifyWasteResponseDto })
  @ApiResponse({ status: 400, description: 'Imagen no enviada o formato inválido.' })
  @ApiResponse({ status: 401, description: 'Usuario no autenticado.' })
  classify(@UploadedFile() file: Express.Multer.File): Promise<ClassifyWasteResponseDto> {
    return this.wasteService.classify(file);
  }

  @Get('categories')
  @ApiOperation({ summary: 'Obtener categorías de desechos' })
  @ApiResponse({ status: 200, description: 'Categorías obtenidas correctamente.', type: [WasteCategory] })
  getCategories(): Promise<WasteCategory[]> {
    return this.wasteService.getCategories();
  }
}
