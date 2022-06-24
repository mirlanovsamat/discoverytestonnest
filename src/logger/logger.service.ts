import { UserService } from 'src/user/user.service';
import { Injectable } from '@nestjs/common';
import * as path from 'path'
import { readdir, stat }  from 'fs/promises';

const date = new Date()

@Injectable()
export class LoggerService {
    constructor(
        private readonly userService: UserService
    ){}
    startSaving(){
        return process.stdout.write(`Начало сохранение файла: ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}:${date.getMilliseconds()} \n`)
    }

    endSaving(){
        return process.stdout.write(`Окончание сохранение файла: ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}:${date.getMilliseconds()} \n`)
    }

    async userMemory(id){
        const user = await this.userService.findById(id)
        return user.memory
    }
    
    async checkFolderSize(folder, id){
        const userMemory = await this.userMemory(id)
        const size = await this.dirSize(folder);
        if(size/1000000 > userMemory){
            return process.stdout.write(`Общий размер файлов привысил 50 мегабайт`)
        } else{
            return process.stdout.write(`Общий размер файлов составляет ${size} байт`)
        }
    }

    async dirSize(directory){
        const files = await readdir( directory );
        const stats = files.map( file => stat( path.join( directory, file ) ) );
        return ( await Promise.all( stats ) ).reduce( ( accumulator, { size } ) => accumulator + size, 0 );
      }
} 