import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('BinWise API')
    .setDescription('API REST para BinWise, una aplicación que ayuda a los usuarios a clasificar desechos, registrar reciclaje, consultar módulos educativos y visualizar su progreso mediante puntos, niveles, recompensas y estadísticas.')
    .setVersion('1.0')
    .addTag('Auth', 'Registro, inicio de sesión y perfil del usuario.')
    .addTag('Waste', 'Clasificación y categorías de desechos.')
    .addTag('Recycling', 'Registro e historial de reciclaje.')
    .addTag('Gamification', 'Puntos y niveles del usuario.')
    .addTag('Rewards', 'Recompensas obtenidas por el usuario.')
    .addTag('Education', 'Módulos educativos sobre reciclaje.')
    .addTag('Stats', 'Estadísticas generales del usuario.')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
