import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { PrismaModule } from '../prisma/prisma.module';
import { PdfStorageService } from './pdf-storage.service';
import { PdfController } from './pdf.controller';

@Module({
  imports: [PrismaModule, HttpModule],
  providers: [PdfStorageService],
  controllers: [PdfController],
  exports: [PdfStorageService],
})
export class StorageModule {}
