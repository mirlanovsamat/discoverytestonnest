import { LoggerService } from './../logger/logger.service';
import { Injectable } from '@nestjs/common';
import * as fs from 'fs'
import { ensureDir } from 'fs-extra'
import  * as path from 'app-root-path'

@Injectable()
export class AdapterService {
    constructor(
        private readonly loggerService: LoggerService
    ){}

    async writeFile(body, buffer){
        return new Promise((resolve, reject) => {
            const uploadFolder = `${path}/${process.env.UPLOAD_FOLDER}/${body.user.username}`;
            ensureDir(uploadFolder)
            this.loggerService.startSaving() 
            const writeStream = fs.createWriteStream(`${uploadFolder}/${body.filename}`)
            writeStream.write(buffer)
            writeStream.on('close', () => {resolve(body.filename)});
            this.loggerService.endSaving()
            writeStream.on("error", err => reject(err));
            writeStream.end()
            this.loggerService.checkFolderSize(uploadFolder, body.user.id)
        })  
    }

    readFile(filename, username){
        const readStream = fs.createReadStream(`${process.env.UPLOAD_FOLDER}/${username}/${filename}`);
        readStream.on("error", err => console.log(err));
        readStream.on("end", () => console.log('end'));
        return readStream
    }
}
