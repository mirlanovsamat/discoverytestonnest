import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class UploadFileMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const filename = req.params.filename
    let buffer = new Buffer('')
    req.on('data', (chunk) => {
        buffer = Buffer.concat([buffer, chunk])
    })
    req.on('end', () => {
        req.body = {
            buffer,
            filename,
            mimetype: req.header('content-type'),
            size: req.header('content-length')
        }
        next()
    })
  }
}
