import { Controller, Get, Req, Param, Put, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { UploadFileService } from './upload-file.service';


@Controller('files')
export class UploadFileController {
  constructor(private readonly uploadFileService: UploadFileService) {}

  @Get(':filename')
    async readFile(@Param('filename') filename: string, @Res() response: Response, @Req() request: Request) {
    const {file, readStream} = await this.uploadFileService.readFile(filename, request.body.user)
    response.writeHead(200, {
      "Content-Type" : file.mimetype,
      "Content-Length": file.size
    });
    readStream.pipe(response)
    }

  @Put(':filename')
    updateFile(@Req() request: Request) {
      return this.uploadFileService.updateFile(request.body)
    }

}
