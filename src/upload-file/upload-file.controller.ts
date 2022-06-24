import { AuthGuard } from './../auth/guards/auth.guard';
import { Controller, Get, Req, Param, Put, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { UploadFileService } from './upload-file.service';


@Controller('files')
@UseGuards(AuthGuard)
export class UploadFileController {
  constructor(private readonly uploadFileService: UploadFileService) {}

  @Get(':filename')
    async readFile(@Param('filename') filename, @Res() response: Response, @Req() request: Request) {
    const readStream = await this.uploadFileService.readFile(filename, request.body.decode)
    readStream.pipe(response)
    }

  @Put(':filename')
    updateFile(@Req() request: Request) {
      return this.uploadFileService.updateFile(request.body)  
    }

}  
