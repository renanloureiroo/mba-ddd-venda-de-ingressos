import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const config = new DocumentBuilder()
    .setTitle('Eventos API')
    .setDescription('API para gerenciamento de eventos e venda de ingressos')
    .setVersion('1.0')
    .build()

  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe())

  const documentFactory = () => SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, documentFactory)

  await app.listen(process.env.PORT ?? 3000)
}
// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap()
