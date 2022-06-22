import { LoggerService } from './../logger/logger.service';
import { Injectable } from '@nestjs/common';
import * as fs from 'fs'

@Injectable()
export class AdapterService {
    constructor(
        private readonly loggerService: LoggerService
    ){}

    async writeFile(filename, buffer){
        return new Promise((resolve, reject) => {
            this.loggerService.startSaving() 
            const writeStream = fs.createWriteStream(`${process.env.UPLOAD_FOLDER}/${filename}`)
            writeStream.write(buffer)
            writeStream.on("error", err => reject(err));
            writeStream.on("end", () => console.log('end'));
            this.loggerService.endSaving()
            this.loggerService.checkFolderSize(process.env.UPLOAD_FOLDER)
            resolve(filename)
        }).then(data => {console.log(data)});
    }

    readFile(filename){
        const readStream = fs.createReadStream(`${process.env.UPLOAD_FOLDER}/${filename}`);
        readStream.on("error", err => console.log(err));
        readStream.on("end", () => console.log('end'));
        return readStream
    }
}
