import { Controller, Get, Param, Res } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import { Response } from 'express';
import { PdfStorageService } from './pdf-storage.service';

/**
 * Public endpoint không auth — phục vụ cho đối tác cấp 2 mở link PDF.
 * URL khó đoán vì maGiaodich là UUID, nhưng nếu cần chặt hơn có thể thêm
 * token ký HMAC vào URL sau.
 */
@ApiExcludeController()
@Controller('files/policies')
export class PdfController {
  constructor(private readonly pdfStorage: PdfStorageService) {}

  @Get(':maGiaodich.pdf')
  async download(
    @Param('maGiaodich') maGiaodich: string,
    @Res() res: Response,
  ) {
    const { stream, size } = await this.pdfStorage.getOrFetch(maGiaodich);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Length', size);
    res.setHeader(
      'Content-Disposition',
      `inline; filename="policy-${maGiaodich}.pdf"`,
    );
    stream.pipe(res);
  }
}
