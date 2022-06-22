import { Injectable } from '@nestjs/common';
import * as path from 'path'
import { readdir, stat }  from 'fs/promises';

const dirSize = async directory => {
  const files = await readdir( directory );
  const stats = files.map( file => stat( path.join( directory, file ) ) );
  return ( await Promise.all( stats ) ).reduce( ( accumulator, { size } ) => accumulator + size, 0 );
}

const date = new Date()

@Injectable()
export class LoggerService {
    startSaving(){
        return process.stdout.write(`Начало сохранение файла: ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}:${date.getMilliseconds()} \n`)
    }

    endSaving(){
        return process.stdout.write(`Окончание сохранение файла: ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}:${date.getMilliseconds()} \n`)
    }

    async checkFolderSize(folder){
        const size = await dirSize(folder);
        if(size/1000000 > 10){
            return process.stdout.write(`Общий размер файлов в папке превысил лимит в 10 мегабайт`)
        } else{
            return process.stdout.write(`Общий размер файлов в папке составляет ${size} байт`)
        }
    }
} 