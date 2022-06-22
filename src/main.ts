import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ensureDir } from 'fs-extra'
import  * as path from 'app-root-path'

const port = process.env.PORT || 5000;
const uploadFolder = `${path}/${process.env.UPLOAD_FOLDER}`;
ensureDir(uploadFolder)

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(port, () => console.log(`Server is started on port ${port}`));
}
bootstrap();
