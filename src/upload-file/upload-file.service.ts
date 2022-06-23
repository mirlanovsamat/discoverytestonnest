import { LoggerService } from './../logger/logger.service';
import { AdapterService } from './../adapter/adapter.service';
import { UploadFileEntity } from './entities/upload-file.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm/repository/Repository';
import { ensureDir } from 'fs-extra'


@Injectable()
export class UploadFileService {
  constructor(
    @InjectRepository(UploadFileEntity)
    private readonly uploadFileRepository: Repository<UploadFileEntity>,
    private readonly adapterService: AdapterService,
    private readonly loggerservice: LoggerService
  ){}

  async readFile(filename, user){
    const file = await this.uploadFileRepository.findOne({where: {name: filename, user: user.id}})
    const readStream = await this.adapterService.readFile(filename, user.username) 
    return {file, readStream}
  }
  
  async updateFile(body){
    const fileDto = {
      name: body.filename,
      mimetype: body.mimetype,
      size: body.size,
      user: body.user.id
    }
    const updatedFile = await this.uploadFileRepository.update({name: body.filename, user: body.user.id}, fileDto)
    if(updatedFile.affected === 0){
      await this.uploadFileRepository.save(fileDto)
    }
    await this.adapterService.writeFile(body, body.buffer)
  }
}
